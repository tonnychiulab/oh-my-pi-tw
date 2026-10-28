import { describe, expect, it } from "bun:test";
import { localizeError, localizeWarning } from "../src/utils/error-localization";

describe("error-localization (繁體中文錯誤與警示訊息本地化)", () => {
	describe("精準匹配項目 (Exact Matches)", () => {
		it("轉譯通用未知錯誤", () => {
			expect(localizeError("Unknown error occurred")).toBe("發生未知的錯誤");
			expect(localizeError("Unknown error")).toBe("未知的錯誤");
		});

		it("轉譯中斷與取消狀態，保留專有名詞", () => {
			expect(localizeError("Operation aborted")).toBe("操作已中斷 (Aborted)");
			expect(localizeError("Compaction cancelled")).toBe("已取消 Compaction");
			expect(localizeError("Handoff cancelled")).toBe("已取消 Handoff");
		});

		it("轉譯網路與權限錯誤", () => {
			expect(localizeError("Request timed out")).toBe("連線逾時 (Request Timeout)");
			expect(localizeError("Network error")).toBe("網路連線錯誤");
			expect(localizeError("Permission denied")).toBe("存取權限不足 (Permission denied)");
		});

		it("轉譯 Session 與 MCP 基礎錯誤", () => {
			expect(localizeError("Session name cannot be empty.")).toBe("Session 名稱不能為空。");
			expect(localizeError("MCP manager not available.")).toBe("MCP manager 目前不可用。");
		});
	});

	describe("動態樣板正則匹配 (Pattern Matching & Preserving Brands/Terms)", () => {
		it("目錄與檔案操作，保留目標名稱", () => {
			expect(localizeError('Cannot create "sub/path": parent directory does not exist')).toBe(
				'無法建立 "sub/path"：父目錄不存在',
			);
			expect(localizeError("Failed to create directory: EACCES")).toBe("建立目錄失敗：EACCES");
		});

		it("Git & Worktree 操作，保留 Worktree 專有名詞", () => {
			expect(localizeError("Worktree creation failed: worktree already exists")).toBe(
				"建立 Worktree 失敗：worktree already exists",
			);
			expect(localizeError("Move failed: target locked")).toBe("Move 操作失敗：target locked");
		});

		it("MCP 與 Server 連線，保留品牌與協定名詞", () => {
			expect(localizeError('Failed to connect to "github": connection reset')).toBe(
				'連線至 MCP "github" 失敗：connection reset',
			);
			expect(localizeError('Server "jira" not found.')).toBe('找不到 Server "jira"。');
			expect(localizeError('Server "slack" already exists in project config.')).toBe(
				'Server "slack" 已存在於 project config。',
			);
		});

		it("Model 與 Provider 限制，保留 Claude / OpenAI 等品牌與 Rate limit 術語", () => {
			expect(localizeError("Unknown model: claude-3-5-sonnet")).toBe("未知的 Model：claude-3-5-sonnet");
			expect(localizeError("No active model available for /btw.")).toBe(
				"沒有可用於 /btw 的作用中 Model。",
			);
			expect(
				localizeError('Rate limit exceeded for provider "Claude". Please retry after 30s.'),
			).toBe('Provider "Claude" 已超出 Rate limit。請於 30s 後重試。');
		});

		it("執行與工具報錯，保留 Bash / Python / Skill", () => {
			expect(localizeError('Tool "write" is not currently active.')).toBe(
				'Tool "write" 目前未啟用。',
			);
			expect(localizeError("Bash command failed: exit 127")).toBe("Bash 指令執行失敗：exit 127");
			expect(localizeError("Python execution failed: ModuleNotFoundError")).toBe(
				"Python 執行失敗：ModuleNotFoundError",
			);
			expect(localizeError("Failed to load skill: YAML parse error")).toBe(
				"載入 Skill 失敗：YAML parse error",
			);
			expect(localizeError("Unknown /skills subcommand: foo")).toBe("未知的 /skills 子指令：foo");
		});

		it("Usage 使用方式說明", () => {
			expect(localizeError("Usage: /move <path>")).toBe("使用方式：/move <path>");
		});
	});

	describe("安全降級機制 (Fallback & Safety)", () => {
		it("未定義之錯誤字串安全保留原文，絕不拋出例外", () => {
			const unknownMsg = "Custom proprietary extension failure #9872";
			expect(localizeError(unknownMsg)).toBe(unknownMsg);
		});

		it("非字串或空字串安全回傳", () => {
			expect(localizeError("")).toBe("");
			expect(localizeWarning("")).toBe("");
		});

		it("警示訊息 localizeWarning 正確套用規則", () => {
			expect(localizeWarning("Session name cannot be empty.")).toBe("Session 名稱不能為空。");
		});
	});
});
