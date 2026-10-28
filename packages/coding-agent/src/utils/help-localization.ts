/**
 * CLI 參數與子指令說明之正體中文本地化模組 (Traditional Chinese - Taiwan)
 *
 * 遵循原則：
 * 1. 專業名詞（如 Model, Token, Profile, Session, Plan, Worktree, MCP, Provider, API key 等）保留不翻譯。
 * 2. 品牌與工具名稱（如 Git, Bun, Rust, Claude, OpenAI, Ollama, Gemini 等）保留不翻譯。
 * 3. 輸出層零衝突包裝：未定義的新增參數安全 Fallback 原始英文描述。
 */

import type { CliConfig, CommandMetadata, FlagDescriptor, ArgDescriptor } from "@oh-my-pi/pi-utils/cli";

/** 子指令描述對照表 (全 50 項子指令完整覆蓋) */
const SUBCOMMAND_DESCRIPTIONS: Record<string, string> = {
	launch: "AI 輔助程式開發助理（預設啟動指令）",
	acp: "啟動 ACP 相容的 Agent 服務器",
	agents: "檢視、檢查與管理 Agents 代理",
	anonymize: "產出脫敏去識別化的 Session 與 Subagents 副本",
	auth: "管理 AI Provider 的身分認證 (API Keys / OAuth)",
	"auth-broker": "管理全系統 Auth Broker 服務",
	"auth-gateway": "啟動本地 API Auth Gateway 反向代理",
	bench: "基準測試評測 Models：測試 TTFT、Prefill 與解碼吞吐量",
	"browser-relay": "啟動本地 CDP Relay，讓瀏覽器控制外部 Chrome 標籤頁",
	cleanse: "透過加權平行 Subagents 自動偵測並修復專案語法與型別診斷錯誤",
	clip: "將 /record 錄製內容上傳至 live.omp.sh 作為公開短片並輸出網址",
	collab: "檢視與管理本地 Collab 協同工作實例",
	commit: "分析程式碼變更並自動生成 Git commit 訊息",
	completions: "輸出 Shell 命令自動補齊腳本 (bash, zsh 或 fish)",
	compress: "將長文本檔案精煉壓縮為高密度 Prompt 格式",
	config: "檢視與修改 omp 設定檔 (settings.json)",
	"dry-balance": "模擬演練跨隨機 Session ID 的 OAuth 帳號負載均衡",
	find: "語意搜尋：描述行為特徵，自動定位實作之檔案與行數範圍",
	gallery: "在視覺展示廊中預覽 Tool、Composer 與狀態列渲染效果",
	gc: "執行儲存區垃圾回收 (Garbage Collection)",
	git: "全螢幕互動式 Git UI：包含 Split Diff 檢視、暫存側邊欄與 Commit 編輯器",
	grep: "快速搜尋檔案內容 (Grep tool)",
	grievances: "檢視、清理或回報自動 QA 收集的工具異常問題",
	"if-bench": "指令遵循能力與工作記憶基準測試",
	images: "檢查、診斷與管理圖片發布後端",
	install: "安裝或連結 Extension 擴充套件（等同 plugin install/link）",
	join: "加入遠端共享的 Collab 協同工作階段",
	login: "登入模型供應商帳號 (終端機命令列版本 /login)",
	models: "列出、搜尋與重新整理所有可用的 Models 清單",
	play: "在終端機中重播 /record 錄製的操作紀錄 (空白鍵暫停，q 退出)",
	plugin: "管理 Plugins 外掛套件 (install, uninstall, list 等)",
	predict: "輸入 Prompt 並即時比對各補全引擎的行內預測文字 (Ghost text)",
	ps: "檢視與控制 Daemon 守護的背景行程 (查看日誌、停止、重啟)",
	read: "測試預覽 Read 工具針對指定路徑、網址或 URI 回傳之內容",
	render: "透過生產級 Transcript 管線繪製 Session 完整對話紀錄",
	say: "使用本地 TTS 語音合成引擎並透過揚聲器朗讀文字",
	search: "測試 Web Search 網路搜尋供應商",
	session: "檢視與管理歷史 Sessions 工作階段",
	setup: "執行引導設置或安裝選用功能的相依環境",
	share: "透過加密連結分享保存的 Session 工作階段",
	shell: "啟動互動式 Shell 控制台",
	skill: "在 Skillshare 市集搜尋、安裝、發布與管理 Skills 技能",
	ssh: "管理 SSH 主機連線設定",
	stats: "檢視 Token 使用量與費用統計儀表板",
	stream: "將本地 omp 工作畫面即時廣播至公開直播頻道",
	"tiny-models": "下載本地輕量端側小模型 (標題生成、記憶摘要、單詞預測)",
	token: "取得指定 Provider 的 API key 或 OAuth Token",
	toks: "使用內建離線 Tokenizer (OpenAI, Claude, Qwen...) 計算 Token 數量",
	ttsr: "檢查與測試時間旅行串流規則 (Time-Traveling Stream Rules)",
	update: "檢查並安裝 omp 的最新版本更新",
	usage: "檢視所有已認證帳號的 Provider 用量與配額上限",
	worktree: "新增、列出或清理 Git worktrees 工作樹",
};

/** 核心旗標選項 (Flags) 描述對照表 (全 55 項參數完整覆蓋) */
const FLAG_DESCRIPTIONS: Record<string, string> = {
	model: '指定使用的 Model（支援模糊搜尋：如 "opus", "gpt-5.2" 或 "openai/gpt-5.2"）',
	smol: "輕量與快速任務專用的 Smol Model（亦可透過 PI_SMOL_MODEL 環境變數設定）",
	slow: "深度推理解析專用的 Slow/Reasoning Model（亦可透過 PI_SLOW_MODEL 環境變數設定）",
	plan: "架構規劃專用的 Plan Model（亦可透過 PI_PLAN_MODEL 環境變數設定）",
	goal: "以 Goal 模式啟動全新目標任務（僅限互動模式；跳過 autoResume）",
	prewalk: "在 Plan todo 清單建立後的第一個 edit/write 操作自動切換至輕量 Model (預設 off)",
	"no-prewalk": "停用 Prewalk 自動降級切換機制",
	"prewalk-into": 'Prewalk 切換的目標 Model（預設使用 "smol" 角色）',
	"plan-yolo": "啟動時強制進入唯讀 Plan 模式，在首次 resolve 時自動核准並實作",
	"plan-yolo-into": 'Plan-YOLO 實作階段的目標 Model（預設使用 "smol" 角色）',
	provider: "指定使用的 Provider（舊版參數相容；建議優先使用 --model）",
	"api-key": "指定 API key（預設讀取環境變數）",
	"system-prompt": "自訂 System prompt 系統提示詞（預設為 coding assistant prompt）",
	"system-prompt-template": "指定 Handlebars 格式的 System prompt 模板（與 --system-prompt 互斥）",
	"append-system-prompt": "在 System prompt 後方附加文字或指定檔案內容",
	"allow-home": "允許直接在家目錄 (~) 啟動，不自動切換至暫存目錄",
	profile: "使用獨立的 Profile 隔離認證、Session、設定與快取",
	alias: "為指定的 Profile 建立 Shell 捷徑別名並結束",
	cwd: "指定啟動的工作目錄（覆寫啟動時的當前路徑）",
	mode: "輸出模式：text（預設）、json、rpc 或 rpc-ui",
	config: "為本次執行載入額外的 config 設定覆蓋（可重複指定）",
	"add-dir": "為本 Session 額外加入的工作區目錄（可重複指定）",
	print: "輸出模型回應結果後直接結束程序 (Print & Exit)",
	continue: "在目前目錄直接接續上一次的 Session",
	resume: "以互動選單列出並恢復最近的歷史 Session（可帶 ID 前綴或路徑）",
	restore: "恢復指定的 Session，並繼續執行上次中斷未完成的工作（包含中斷的輪次與執行中的 subagents）",
	"from-claude": "從 Claude Code 匯入 Session 工作階段至 OMP",
	"from-codex": "從 Codex 匯入 Session 工作階段至 OMP",
	"session-dir": "指定 Session 儲存與檢索目錄",
	"no-session": "不儲存本次 Session（即用即棄模式 Ephemeral）",
	models: "以逗號分隔指定快速循環切換的 Models 清單 (Ctrl+P)",
	"no-tools": "停用所有內建 Tools 工具",
	"no-lsp": "停用 LSP 語言伺服器工具、代碼格式化與語法診斷",
	"no-pty": "停用基於 PTY 的互動式 Bash 執行環境",
	tools: "以逗號分隔指定要啟用的 Tools 清單 (預設: 全部啟用)",
	thinking: "設定 Model 思考強度 Thinking level（off, min, low, med, high, max）",
	"service-tier": "設定本次 Session 的 OpenAI Service tier 服務等級 (none 表示省略)",
	"hide-thinking": "在 TUI 輸出畫面中隱藏 Thinking 思考區塊 (僅視覺隱藏，不影響思考生成)",
	advisor: "啟用 Advisor 背景顧問執行時 (被動審查每輪對話並注入建議筆記)",
	"wait-async": "Print 模式：結束前等待所有背景任務完成並回報結果 (async.printWake)",
	"external-thinking": "使用私有草稿暫存並停用模型原生推理 (自行承擔風險：部分 Provider 可能視為濫用)",
	hook: "載入指定的 Hook/Extension 擴充檔案 (可重複多次指定)",
	extension: "載入指定的 Extension 擴充套件檔案 (可重複多次指定)",
	"no-extensions": "停用 Extensions 自動探索發現 (顯式指定之 -e 路徑仍有效)",
	"no-skills": "停用 Skills 技能自動探索與載入",
	skills: "以逗號分隔指定要過濾啟用的 Skills 模式 (如 git-*,docker)",
	"no-rules": "停用 Rules 規則探索與載入",
	"no-context-files": "停用專案 Context 檔案載入 (AGENTS.md, CLAUDE.md 等)",
	export: "將 Session 工作階段匯出為 HTML 網頁並結束",
	"no-title": "停用 Session 標題自動生成",
	"no-ui": "在 --mode rpc 或 rpc-ui 下無介面無頭執行擴充套件",
	"print-thoughts": "在 Print 模式文字輸出中包含 Thinking 思考區塊",
	"max-time": "設定 Session 最大執行時限 (如 600, 10m, 1h)",
	"warn-cost": "當 Session 累計花費 (含 subagents) 達到指定 USD 金額時發出警告",
	"max-cost": "當 Session 累計花費達到指定 USD 金額時停止發送模型請求 (Print 模式回傳代碼 3)",
	"auto-approve": "自動核准所有 Tool 工具調用（跳過確認提示，同 yolo 模式）",
	"approval-mode": "覆寫本次 Session 的工具核准模式 (always-ask|always-ask-cached|write|yolo)",
	verbose: "顯示詳細偵錯日誌 (Verbose)",
	version: "顯示版本資訊",
	help: "顯示此使用說明手冊",
	license: "顯示開源授權與第三方軟體協議資訊 (License)",
	yolo: "以 YOLO 模式執行（所有確認提示與工具呼叫自動核准）",
	"non-interactive": "以非互動模式執行（不主動詢問使用者確認）",
	session: "依 Session ID 或名稱恢復指定的歷史工作階段",
	fork: "將目前的 Session 分岔為新分支 (fork)",
};

/** 範例註解繁中化映射表 */
const EXAMPLE_COMMENT_MAP: Record<string, string> = {
	"# Interactive mode with initial prompt": "# 帶入初始提示詞啟動互動模式",
	"# Interactive mode": "# 啟動互動交談模式 (預設)",
	"# Start working on a goal immediately": "# 立即以 Goal 目標模式開始工作",
	"# Include files in initial message": "# 在初始訊息中夾帶檔案（使用 @ 路徑）",
	"# Non-interactive mode (process and exit)": "# 非互動模式（處理 Prompt 並直接輸出結果退出）",
	"# Continue previous session": "# 延續上一次的 Session 歷史工作階段",
	"# Pick a session back up after a crash, subagents included": "# 在程序異常後恢復指定 Session（包含先前的 subagents）",
	"# Create a shell shortcut for a work profile": "# 為指定的 Profile 建立 Shell 捷徑別名 (Alias)",
	"# Use different model (fuzzy matching)": "# 切換指定 Model 模型（支援模糊匹配）",
	"# Limit model cycling to specific models": "# 限制 Ctrl+P 快捷鍵切換的特定 Models 清單",
	"# Export a session file to HTML": "# 將 Session 歷程檔案匯出為 HTML 網頁文件",
};

/** 參數 (Arguments) 描述對照表 */
const ARG_DESCRIPTIONS: Record<string, string> = {
	messages: "發送給 AI 的訊息或提示詞（檔案路徑請加上 @ 前綴，如 @file.ts）",
};

/**
 * 本地化單一 Flag 描述
 */
export function localizeFlagDescription(flagName: string, originalDesc?: string): string | undefined {
	return FLAG_DESCRIPTIONS[flagName] ?? originalDesc;
}

/**
 * 本地化單一子指令描述
 */
export function localizeCommandDescription(commandName: string, originalDesc?: string): string | undefined {
	return SUBCOMMAND_DESCRIPTIONS[commandName] ?? originalDesc;
}

/**
 * 將 CLI Config 中的指令、旗標、參數、範例說明動態轉譯為正體中文
 */
export function localizeCliConfig(config: CliConfig<CommandMetadata>): CliConfig<CommandMetadata> {
	const localizedCommands = new Map<string, CommandMetadata>();

	for (const [name, meta] of config.commands.entries()) {
		const newMeta: CommandMetadata = {
			...meta,
			description: SUBCOMMAND_DESCRIPTIONS[name] ?? meta.description,
		};

		// 轉譯 Flags
		if (meta.flags) {
			const newFlags: Record<string, FlagDescriptor<any>> = {};
			for (const [flagName, flagDesc] of Object.entries(meta.flags)) {
				newFlags[flagName] = {
					...flagDesc,
					description: FLAG_DESCRIPTIONS[flagName] ?? flagDesc.description,
				};
			}
			newMeta.flags = newFlags;
		}

		// 轉譯 Args
		if (meta.args) {
			const newArgs: Record<string, ArgDescriptor> = {};
			for (const [argName, argDesc] of Object.entries(meta.args)) {
				newArgs[argName] = {
					...argDesc,
					description: ARG_DESCRIPTIONS[argName.toLowerCase()] ?? argDesc.description,
				};
			}
			newMeta.args = newArgs;
		}

		// 轉譯 Examples 註解
		if (meta.examples) {
			newMeta.examples = meta.examples.map(ex => {
				let localizedEx = ex;
				for (const [en, zh] of Object.entries(EXAMPLE_COMMENT_MAP)) {
					localizedEx = localizedEx.replace(en, zh);
				}
				return localizedEx;
			});
		}

		localizedCommands.set(name, newMeta);
	}

	return {
		...config,
		commands: localizedCommands,
	};
}
