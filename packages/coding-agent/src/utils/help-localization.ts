/**
 * CLI 參數與子指令說明之正體中文本地化模組 (Traditional Chinese - Taiwan)
 *
 * 遵循原則：
 * 1. 專業名詞（如 Model, Token, Profile, Session, Plan, Worktree, MCP, Provider, API key 等）保留不翻譯。
 * 2. 品牌與工具名稱（如 Git, Bun, Rust, Claude, OpenAI, Ollama, Gemini 等）保留不翻譯。
 * 3. 輸出層零衝突包裝：未定義的新增參數安全 Fallback 原始英文描述。
 */

import type { CliConfig, CommandMetadata, FlagDescriptor, ArgDescriptor } from "@oh-my-pi/pi-utils/cli";

/** 子指令描述對照表 */
const SUBCOMMAND_DESCRIPTIONS: Record<string, string> = {
	launch: "AI 輔助程式開發助理（預設啟動指令）",
	acp: "啟動 ACP 相容的 Agent 服務器",
	auth: "管理 AI Provider 的身分認證 (API Keys / OAuth)",
	"auth-broker": "管理全系統 Auth Broker 服務",
	"auth-gateway": "啟動本地 API Auth Gateway 反向代理",
	agents: "檢視、檢查與管理 Agents 代理",
	config: "檢視與修改 omp 設定檔 (settings.json)",
	commit: "分析程式碼變更並自動生成 Git commit 訊息",
	stats: "檢視 Token 使用量與費用統計儀表板",
	update: "檢查並安裝 omp 的最新版本更新",
	marketplace: "管理 Plugin 市集 (Marketplaces)",
	profile: "管理使用者 Profiles 設定隔離環境",
	session: "檢視與管理歷史 Sessions 工作階段",
	skills: "搜尋、安裝與管理 Skills 技能庫",
	tools: "檢視所有目前可用的 Tools 清單",
};

/** 核心旗標選項 (Flags) 描述對照表 */
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
	thinking: "設定 Model 思考強度 Thinking effort（off, min, low, med, high, max）",
	verbose: "顯示詳細偵錯日誌 (Verbose)",
	version: "顯示版本資訊",
	help: "顯示此使用說明手冊",
	license: "顯示開源授權與第三方軟體協議資訊 (License)",
	yolo: "以 YOLO 模式執行（所有確認提示與工具呼叫自動核准）",
	"non-interactive": "以非互動模式執行（不主動詢問使用者確認）",
	session: "依 Session ID 或名稱恢復指定的歷史工作階段",
	fork: "將目前的 Session 分岔為新分支 (fork)",
	tools: "以逗號分隔指定要啟用的 Tools 清單",
	"no-tools": "停用所有 Tools",
	mcp: "啟用或停用指定的 MCP servers",
	"no-mcp": "停用所有 MCP servers",
	skills: "啟用或停用指定的 Skills",
	"no-skills": "停用所有 Skills",
	extensions: "載入額外的 Extensions 擴充套件",
	"no-extensions": "停用所有 Extensions 擴充套件",
	print: "輸出模型回應結果後直接結束程序 (Print & Exit)",
	continue: "在目前目錄直接接續上一次的 Session",
	resume: "以互動選單列出並恢復最近的歷史 Session",
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
 * 將 CLI Config 中的指令、旗標、參數說明動態轉譯為正體中文
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

		localizedCommands.set(name, newMeta);
	}

	return {
		...config,
		commands: localizedCommands,
	};
}
