/**
 * 繁體中文錯誤與警示訊息本地化模組 (Traditional Chinese - Taiwan)
 *
 * 遵循原則：
 * 1. 專業名詞（如 Worktree, AST, Diff, Token, Buffer, Session, Plan 等）保留不翻譯。
 * 2. 品牌與工具名稱（如 Git, Bun, Rust, Claude, OpenAI, Ollama, MCP 等）保留不翻譯。
 * 3. 輸出層過濾管線設計：無匹配時安全 fallback 回原始英文，不影響系統運作與上游相容性。
 */

interface ErrorPattern {
	pattern: RegExp;
	replace: string | ((match: RegExpExecArray) => string);
}

/** 完整精準匹配字典 */
const EXACT_ERROR_MAP: Record<string, string> = {
	"Unknown error occurred": "發生未知的錯誤",
	"Unknown error": "未知的錯誤",
	"Operation aborted": "操作已中斷 (Aborted)",
	"Request timed out": "連線逾時 (Request Timeout)",
	"Network error": "網路連線錯誤",
	"Connection refused": "連線被拒絕 (Connection refused)",
	"File not found": "找不到檔案",
	"Directory not found": "找不到目錄",
	"Permission denied": "存取權限不足 (Permission denied)",
	"Compaction cancelled": "已取消 Compaction",
	"Handoff cancelled": "已取消 Handoff",
	"Session name cannot be empty.": "Session 名稱不能為空。",
	"MCP manager not available.": "MCP manager 目前不可用。",
	"No MCP manager available.": "未配置 MCP manager。",
	"Smithery API key cannot be empty.": "Smithery API key 不能為空。",
	"Server name cannot be empty.": "Server 名稱不能為空。",
};

/** 動態樣板匹配清單 */
const PATTERN_RULES: ErrorPattern[] = [
	// 目錄與檔案操作
	{
		pattern: /^Cannot create "([^"]+)": parent directory does not exist$/i,
		replace: (_m) => `無法建立 "${_m[1]}"：父目錄不存在`,
	},
	{
		pattern: /^Failed to create directory: (.*)$/i,
		replace: (_m) => `建立目錄失敗：${_m[1]}`,
	},
	{
		pattern: /^Plan file not found at (.*)$/i,
		replace: (_m) => `在 ${_m[1]} 找不到 Plan 檔案`,
	},
	{
		pattern: /^Invalid plan save path: (.*)$/i,
		replace: (_m) => `無效的 Plan 儲存路徑：${_m[1]}`,
	},
	{
		pattern: /^Failed to save plan: (.*)$/i,
		replace: (_m) => `儲存 Plan 失敗：${_m[1]}`,
	},
	{
		pattern: /^Failed to refine plan: (.*)$/i,
		replace: (_m) => `修改 Plan 失敗：${_m[1]}`,
	},
	{
		pattern: /^Plan review failed: (.*)$/i,
		replace: (_m) => `Plan review 失敗：${_m[1]}`,
	},

	// Git & Worktree
	{
		pattern: /^Worktree creation failed: (.*)$/i,
		replace: (_m) => `建立 Worktree 失敗：${_m[1]}`,
	},
	{
		pattern: /^Move failed: (.*)$/i,
		replace: (_m) => `Move 操作失敗：${_m[1]}`,
	},
	{
		pattern: /^Rename failed: (.*)$/i,
		replace: (_m) => `Rename 操作失敗：${_m[1]}`,
	},

	// MCP 與 Server
	{
		pattern: /^Failed to connect to "([^"]+)": (.*)$/i,
		replace: (_m) => `連線至 MCP "${_m[1]}" 失敗：${_m[2]}`,
	},
	{
		pattern: /^Server "([^"]+)" not found\.$/i,
		replace: (_m) => `找不到 Server "${_m[1]}"。`,
	},
	{
		pattern: /^Server "([^"]+)" already exists in (.*) config\.$/i,
		replace: (_m) => `Server "${_m[1]}" 已存在於 ${_m[2]} config。`,
	},
	{
		pattern: /^Server "([^"]+)" is disabled\. Run \/mcp enable \1 first\.$/i,
		replace: (_m) => `Server "${_m[1]}" 已停用。請先執行 /mcp enable ${_m[1]}。`,
	},
	{
		pattern: /^Failed to reload MCP: (.*)$/i,
		replace: (_m) => `重新載入 MCP 失敗：${_m[1]}`,
	},
	{
		pattern: /^Failed to clear auth: (.*)$/i,
		replace: (_m) => `清除 Auth 失敗：${_m[1]}`,
	},
	{
		pattern: /^Smithery search failed: (.*)$/i,
		replace: (_m) => `Smithery 搜尋失敗：${_m[1]}`,
	},

	// 模型與 Provider
	{
		pattern: /^Unknown model: (.*)$/i,
		replace: (_m) => `未知的 Model：${_m[1]}`,
	},
	{
		pattern: /^No active model available for (.*)\.$/i,
		replace: (_m) => `沒有可用於 ${_m[1]} 的作用中 Model。`,
	},
	{
		pattern: /^Rate limit exceeded for provider "([^"]+)". Please retry after (.*)\.$/i,
		replace: (_m) => `Provider "${_m[1]}" 已超出 Rate limit。請於 ${_m[2]} 後重試。`,
	},
	{
		pattern: /^Rate limit exceeded\.? (.*)$/i,
		replace: (_m) => `已超出 Rate limit。${_m[1]}`,
	},

	// 工具與指令
	{
		pattern: /^Tool "([^"]+)" is not currently active\.$/i,
		replace: (_m) => `Tool "${_m[1]}" 目前未啟用。`,
	},
	{
		pattern: /^Bash command failed: (.*)$/i,
		replace: (_m) => `Bash 指令執行失敗：${_m[1]}`,
	},
	{
		pattern: /^Python execution failed: (.*)$/i,
		replace: (_m) => `Python 執行失敗：${_m[1]}`,
	},
	{
		pattern: /^Compaction failed: (.*)$/i,
		replace: (_m) => `Compaction 失敗：${_m[1]}`,
	},
	{
		pattern: /^Handoff failed: (.*)$/i,
		replace: (_m) => `Handoff 失敗：${_m[1]}`,
	},
	{
		pattern: /^Failed to restore local session: (.*)$/i,
		replace: (_m) => `還原本地 Session 失敗：${_m[1]}`,
	},
	{
		pattern: /^Failed to load skill: (.*)$/i,
		replace: (_m) => `載入 Skill 失敗：${_m[1]}`,
	},
	{
		pattern: /^Unknown \/skills subcommand: (.*)$/i,
		replace: (_m) => `未知的 /skills 子指令：${_m[1]}`,
	},

	// 使用說明 Usage
	{
		pattern: /^Usage: (.*)$/i,
		replace: (_m) => `使用方式：${_m[1]}`,
	},

	// 通用「Failed to ...」樣板
	{
		pattern: /^Failed to ([^:]+): (.*)$/i,
		replace: (_m) => `${_m[1]} 失敗：${_m[2]}`,
	},
];

/**
 * 將原始英文錯誤訊息轉譯為正體中文（繁體中文）
 * @param errorMessage 原始錯誤字串
 * @returns 轉譯後文字（若無匹配則返回原始字串）
 */
export function localizeError(errorMessage: string): string {
	if (!errorMessage || typeof errorMessage !== "string") {
		return errorMessage;
	}

	const trimmed = errorMessage.trim();

	// 1. 精準對照
	if (EXACT_ERROR_MAP[trimmed]) {
		return EXACT_ERROR_MAP[trimmed];
	}

	// 2. 樣板正則匹配
	for (const rule of PATTERN_RULES) {
		const match = rule.pattern.exec(trimmed);
		if (match) {
			return typeof rule.replace === "function" ? rule.replace(match) : trimmed.replace(rule.pattern, rule.replace);
		}
	}

	// 3. 安全 Fallback 原文
	return errorMessage;
}

/**
 * 將原始英文警示訊息轉譯為正體中文（繁體中文）
 * @param warningMessage 原始警示字串
 * @returns 轉譯後文字（若無匹配則返回原始字串）
 */
export function localizeWarning(warningMessage: string): string {
	if (!warningMessage || typeof warningMessage !== "string") {
		return warningMessage;
	}

	// 目前共用相同的樣板與關鍵字轉換
	return localizeError(warningMessage);
}
