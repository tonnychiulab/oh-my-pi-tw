import { describe, expect, it } from "bun:test";
import {
	localizeFlagDescription,
	localizeCommandDescription,
	localizeCliConfig,
} from "../src/utils/help-localization";
import type { CliConfig, CommandMetadata } from "@oh-my-pi/pi-utils/cli";

describe("help-localization (CLI 參數與指令說明正體中文本地化)", () => {
	describe("核心旗標 (Flags) 描述轉譯", () => {
		it("轉譯常用核心參數，並保留 Model / Profile / Session 等術語", () => {
			expect(localizeFlagDescription("model")).toContain("指定使用的 Model");
			expect(localizeFlagDescription("smol")).toContain("Smol Model");
			expect(localizeFlagDescription("plan")).toContain("Plan Model");
			expect(localizeFlagDescription("profile")).toContain("Profile");
			expect(localizeFlagDescription("cwd")).toContain("指定啟動的工作目錄");
			expect(localizeFlagDescription("yolo")).toContain("YOLO 模式");
			expect(localizeFlagDescription("restore")).toContain("恢復指定的 Session");
			expect(localizeFlagDescription("from-claude")).toContain("Claude Code");
			expect(localizeFlagDescription("from-codex")).toContain("Codex");
			expect(localizeFlagDescription("approval-mode")).toContain("核准模式");
		});

		it("未定義之未知參數安全 fallback 原描述", () => {
			const original = "Some futuristic novel flag description";
			expect(localizeFlagDescription("unknown-custom-flag", original)).toBe(original);
		});
	});

	describe("子指令 (Subcommands) 描述轉譯", () => {
		it("轉譯主要子指令", () => {
			expect(localizeCommandDescription("auth")).toContain("身分認證");
			expect(localizeCommandDescription("config")).toContain("設定檔");
			expect(localizeCommandDescription("commit")).toContain("Git commit");
			expect(localizeCommandDescription("stats")).toContain("Token");
		});

		it("未定義之子指令安全 fallback 原描述", () => {
			const original = "Custom plugin command";
			expect(localizeCommandDescription("custom-plugin", original)).toBe(original);
		});
	});

	describe("完整 CliConfig 轉換", () => {
		it("將整份 CliConfig 的指令、Flags、Args 同步轉譯", () => {
			const mockConfig: CliConfig<CommandMetadata> = {
				bin: "omp",
				version: "18.13.2",
				commands: new Map([
					[
						"launch",
						{
							name: "launch",
							hidden: true,
							description: "AI coding assistant",
							flags: {
								model: { kind: "string", description: "Old model desc" },
								cwd: { kind: "string", description: "Old cwd desc" },
							},
							args: {
								messages: { kind: "string", description: "Old messages desc" },
							},
						},
					],
					[
						"auth",
						{
							name: "auth",
							description: "Manage authentication",
						},
					],
				]),
			};

			const localized = localizeCliConfig(mockConfig);
			const launchCmd = localized.commands.get("launch");
			const authCmd = localized.commands.get("auth");

			expect(launchCmd?.flags?.model.description).toContain("指定使用的 Model");
			expect(launchCmd?.flags?.cwd.description).toContain("工作目錄");
			expect(launchCmd?.args?.messages.description).toContain("發送給 AI 的訊息");
			expect(authCmd?.description).toContain("身分認證");
		});
	});
});
