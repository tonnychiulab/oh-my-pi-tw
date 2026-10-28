# oh-my-pi-tw 正體中文錯誤檢視開發紀錄與架構設計

本文件記錄 `oh-my-pi-tw` 專案導入正體中文錯誤檢視機制、專業名詞/品牌白名單保護，以及在全新 Ubuntu LTS Server 上完成 E2E 驗證並合併主幹的完整研發歷程。

---

## 🤖 協同開發環境與 AI 技能

* **AI 代理助理**：Google DeepMind Advanced Agentic Coding（Antigravity）
* **底層模型**：**Gemini 3.8 Flash (Medium)**
* **執行環境**：Antigravity CLI (`agy`) 配合 YOLO 自主執行模式
* **核心設計框架與技能**：
  * **Google Elephant-Goldfish Model (EGM)**（`google/elephant-goldfish-model` 外掛）：
    * **大象 (Elephant - 深度上下文主工作 Session)**：負責掌握整體 Codebase（包含 Bun 執行時、TypeScript 前端、Rust 原生模組）架構脈絡，探索問題邊界、拍板零衝突架構決策，並精確制定設計規格。
    * **金魚 (Goldfish - 零上下文獨立審查視角)**：以「7 秒記憶」的冷眼第三方視角，針對設計草稿進行壓力測試，排查術語洩漏、上游合併衝突、跨平台相容性與邊界例外。
    * **規格驅動開發 (Spec-Driven Development, SDD)**：嚴格遵循「先探索需求、起草規格、審查盲點、才精準落實代碼與自動化驗證」的高品質工程哲學。

---

## 🎯 需求背景與核心挑戰

### 1. 痛點
`oh-my-pi`（omp）為具備深度 IDE 整合的強大 AI Coding Agent（約 8 萬行 Rust 核心 + 數十萬行 TypeScript）。全專案有上千處硬編碼英文錯誤（如 `throw new Error(...)`、`chalk.red("Error: ...")`）。本功能的誕生源自文組同事與客戶的強烈許願——在操作 CLI 或閱讀 TUI 報錯時常常被滿屏的長串英文嚇退，希望能有親切、清楚易懂的正體中文提示，同時保留核心技術名詞方便查閱。

### 2. 核心約束
* **正體中文呈現**：終端機與 TUI 錯誤橫幅必須為自然通順的台灣正體中文。
* **專業名詞與品牌嚴格保留**：如 `Worktree`, `AST`, `MCP`, `Token`, `Session`, `Plan`, `Git`, `Bun`, `Claude`, `OpenAI` 等技術名詞與品牌一律不翻譯，維持技術原意精準性。
* **上游零衝突長治久安（Zero-Conflict Upstream Maintainability）**：`oh-my-pi-tw` 為 Fork 自官方上游（`can1357/oh-my-pi`）的分支，若粗暴修改數千處原始碼中的錯誤字串，未來每次 Rebase 上游更新都將面臨毀滅性的程式碼衝突。

---

## 🏗️ 架構設計：輸出層中介轉譯管線 (Output-Stage Translation Pipeline)

我們採用**「輸出端集中攔截 + 白名單正則過濾」**架構：

```text
+-------------------------------------------------------+
|  業務邏輯層 (Controller / Tools / Native Crates)     |
|  - 維持拋出原始英文 Error / Rejection (與上游 100% 一致) |
+-------------------------------------------------------+
                           │
                           ▼
+-------------------------------------------------------+
|  輸出收斂點 (ui-helpers.ts / cli.ts / args.ts)        |
+-------------------------------------------------------+
                           │
                           ▼
+-------------------------------------------------------+
|  error-localization 轉譯引擎                          |
|  1. 精準字典匹配 (Exact Match)                        |
|  2. 動態樣板正則匹配 (Pattern Replacement)             |
|  3. 專業術語與品牌白名單保護                           |
|  4. 安全 Fallback (未命中則回傳原始英文)               |
+-------------------------------------------------------+
                           │
                           ▼
+-------------------------------------------------------+
|  使用者畫面 (TUI 視窗 / CLI stderr)                   |
|  -> 顯示「錯誤: 未知的參數 (Flag)：--unknown-param」   |
+-------------------------------------------------------+
```

### 改動關鍵檔案清單
1. `packages/coding-agent/src/utils/error-localization.ts`（新增）：輕量轉譯核心，包含精準對照表、動態樣板正則與白名單過濾。
2. `packages/coding-agent/src/modes/utils/ui-helpers.ts`：TUI 呈現層 `showError` 與 `showWarning` 的轉譯攔截。
3. `packages/coding-agent/src/cli.ts`：CLI 啟動致命錯誤與 worker selector 的轉譯攔截。
4. `packages/coding-agent/src/cli/args.ts`：命令列 Flag 參數解析器（`reportUnrecognizedFlags`、`reportInvalidFlagValues`、`reportCliUsageError`）的轉譯攔截。

---

## 🧪 測試驅動與驗證套件

為避免人工繁瑣測試，本次研發建立了完整的自動化驗證矩陣：

1. **單元邏輯腳本** (`scripts/test-error-localization.mjs`)：
   * 覆蓋 8 大分類：精準對照、目錄檔案、Worktree/Git、MCP/Server、Model/Provider、工具執行、Usage 說明與 Fallback。
2. **Bun 原生測試套件** (`packages/coding-agent/test/error-localization.test.ts` & `cli-zh-tw-e2e.test.ts`)：
   * 13 個測試情境、30 個斷言，執行時間僅 32ms。
3. **一鍵式自動化 E2E 腳本** (`scripts/e2e-zh-tw-test.sh`)：
   * 實際呼叫系統安裝之 `omp` 執行檔，端對端驗證真實終端機輸出與正體中文檢視。

---

## 🐧 Ubuntu 26.04.1 LTS Server 實機部署除錯實錄

在全新的 Ubuntu LTS Server 實機驗證期間，排解了以下關鍵底層問題：

1. **Rust 原生模組編譯依賴缺失**：
   * 原生模組中的 `wasmtime-c-api` 與 C/C++ 綁定在執行 `bun run setup` 時觸發 `failed to spawn cmake`。
   * 處置方案：補齊 `cmake`、`clang`、`libclang-dev`、`make`、`ninja-build` 工具鏈，順利完成原生編譯。
2. **tmux 整合最佳化**：
   * 針對遠端工作者常用的 tmux，設定 `allow-passthrough on`（避免 tmux 3.3+ 吞掉 Kitty 圖片與 OSC 剪貼簿控制碼）、`escape-time 0`（消除 Esc 鍵延遲）與 24-bit TrueColor。
3. **E2E 驗證通過**：
   * 執行 `bash scripts/e2e-zh-tw-test.sh` 達成 **5/5 項測試全數 PASS**。

---

## 🚀 成果與主幹合併 (Main Branch)

* 本專案已將 `feature/zh-tw-error-localization` 分支 Fast-forward 合併回 `main` 分支並成功推送至 GitHub：
  * **儲存庫**：`https://github.com/tonnychiulab/oh-my-pi-tw`
  * **主幹最新 Commit**：`5627571e47`
* 現在任何使用者在全新機器上執行 `git clone`，即可直接享受具備正體中文錯誤檢視且保留專業術語的 `omp`！
