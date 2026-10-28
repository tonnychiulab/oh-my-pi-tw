import { describe, expect, it } from "bun:test";
import { parseArgs, reportUnrecognizedFlags } from "../src/cli/args";

describe("CLI 正體中文錯誤檢視 E2E 測試", () => {
	it("單一未知 Flag 正確輸出正體中文與術語保留", () => {
		const parsed = parseArgs(["--unknown-param"]);
		let captured = "";
		const success = reportUnrecognizedFlags(parsed, text => {
			captured += text;
		});

		expect(success).toBe(true);
		expect(captured).toContain("錯誤: 未知的參數 (Flag)：--unknown-param");
		expect(captured).toContain("檢視可用參數");
	});

	it("複數未知 Flags 正確組合輸出", () => {
		const parsed = parseArgs(["--alpha-test", "--beta-test"]);
		let captured = "";
		reportUnrecognizedFlags(parsed, text => {
			captured += text;
		});

		expect(captured).toContain("錯誤: 未知的參數 (Flag)：--alpha-test, --beta-test");
	});
});
