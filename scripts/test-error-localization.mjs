import assert from "node:assert/strict";
import { localizeError, localizeWarning } from "../packages/coding-agent/src/utils/error-localization.ts";

console.log("=== 開始執行正體中文錯誤本地化驗證測試 ===");

// 1. 精準對照測試
assert.equal(localizeError("Unknown error occurred"), "發生未知的錯誤");
assert.equal(localizeError("Unknown error"), "未知的錯誤");
assert.equal(localizeError("Operation aborted"), "操作已中斷 (Aborted)");
assert.equal(localizeError("Compaction cancelled"), "已取消 Compaction");
assert.equal(localizeError("Handoff cancelled"), "已取消 Handoff");
assert.equal(localizeError("Request timed out"), "連線逾時 (Request Timeout)");
assert.equal(localizeError("Network error"), "網路連線錯誤");
assert.equal(localizeError("Permission denied"), "存取權限不足 (Permission denied)");
assert.equal(localizeError("Session name cannot be empty."), "Session 名稱不能為空。");
assert.equal(localizeError("MCP manager not available."), "MCP manager 目前不可用。");
console.log("✔ 測試通過：精準匹配字典");

// 2. 目錄與檔案操作
assert.equal(
	localizeError('Cannot create "sub/path": parent directory does not exist'),
	'無法建立 "sub/path"：父目錄不存在'
);
assert.equal(
	localizeError("Failed to create directory: EACCES"),
	"建立目錄失敗：EACCES"
);
console.log("✔ 測試通過：目錄與檔案操作樣板");

// 3. Worktree 與 Git
assert.equal(
	localizeError("Worktree creation failed: worktree already exists"),
	"建立 Worktree 失敗：worktree already exists"
);
assert.equal(
	localizeError("Move failed: target locked"),
	"Move 操作失敗：target locked"
);
console.log("✔ 測試通過：Worktree 與 Git 樣板（保留 Worktree 專有名詞）");

// 4. MCP 與 Server 連線
assert.equal(
	localizeError('Failed to connect to "github": connection reset'),
	'連線至 MCP "github" 失敗：connection reset'
);
assert.equal(
	localizeError('Server "jira" not found.'),
	'找不到 Server "jira"。'
);
assert.equal(
	localizeError('Server "slack" already exists in project config.'),
	'Server "slack" 已存在於 project config。'
);
console.log("✔ 測試通過：MCP 與 Server 連線（保留 MCP、Server 與品牌名稱）");

// 5. Model 與 Provider 限制
assert.equal(
	localizeError("Unknown model: claude-3-5-sonnet"),
	"未知的 Model：claude-3-5-sonnet"
);
assert.equal(
	localizeError("No active model available for /btw."),
	"沒有可用於 /btw 的作用中 Model。"
);
assert.equal(
	localizeError('Rate limit exceeded for provider "Claude". Please retry after 30s.'),
	'Provider "Claude" 已超出 Rate limit。請於 30s 後重試。'
);
console.log("✔ 測試通過：Model 與 Provider（保留 Claude / OpenAI 品牌與 Rate limit 術語）");

// 6. 工具與執行報錯
assert.equal(
	localizeError('Tool "write" is not currently active.'),
	'Tool "write" 目前未啟用。'
);
assert.equal(
	localizeError("Bash command failed: exit 127"),
	"Bash 指令執行失敗：exit 127"
);
assert.equal(
	localizeError("Python execution failed: ModuleNotFoundError"),
	"Python 執行失敗：ModuleNotFoundError"
);
assert.equal(
	localizeError("Failed to load skill: YAML parse error"),
	"載入 Skill 失敗：YAML parse error"
);
assert.equal(
	localizeError("Unknown /skills subcommand: foo"),
	"未知的 /skills 子指令：foo"
);
console.log("✔ 測試通過：工具與執行報錯（保留 Bash / Python / Skill）");

// 7. 使用方式 Usage 與參數
assert.equal(
	localizeError("unknown flag: --unknown-param"),
	"未知的參數 (Flag)：--unknown-param"
);
assert.equal(
	localizeError("unknown flags: -a, -b"),
	"未知的參數 (Flag)：-a, -b"
);
assert.equal(
	localizeError("Usage: /move <path>"),
	"使用方式：/move <path>"
);
console.log("✔ 測試通過：使用說明 Usage 與參數樣板");

// 8. 安全降級 Fallback
const unknownMsg = "Custom proprietary extension failure #9872";
assert.equal(localizeError(unknownMsg), unknownMsg);
assert.equal(localizeError(""), "");
assert.equal(localizeWarning(""), "");
assert.equal(localizeWarning("Session name cannot be empty."), "Session 名稱不能為空。");
console.log("✔ 測試通過：安全降級 Fallback 機制");

console.log("\n 全部 8 組測試項目 100% 通過！");
