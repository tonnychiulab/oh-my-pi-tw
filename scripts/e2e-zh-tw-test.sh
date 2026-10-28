#!/usr/bin/env bash
# ==============================================================================
# oh-my-pi-tw 正體中文錯誤檢視端對端 (E2E) 自動化測試腳本
# ==============================================================================
set -u

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

report_pass() {
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    PASSED_TESTS=$((PASSED_TESTS + 1))
    echo -e "  [${GREEN}PASS${NC}] $1"
}

report_fail() {
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    FAILED_TESTS=$((FAILED_TESTS + 1))
    echo -e "  [${RED}FAIL${NC}] $1"
    echo -e "         ${YELLOW}預期包含:${NC} $2"
    echo -e "         ${YELLOW}實際輸出:${NC} $3"
}

echo -e "\n${BLUE}======================================================${NC}"
echo -e "${BLUE}  開始執行 oh-my-pi-tw 正體中文錯誤檢視 E2E 測試  ${NC}"
echo -e "${BLUE}======================================================${NC}\n"

# 1. 找出可用的 omp 執行檔路徑 (若全域未 link 則 fallback 到 bun 原始碼執行)
if command -v omp &> /dev/null; then
    OMP_CMD="omp"
    echo -e "✔ 使用系統 omp 命令: $(which omp)"
else
    OMP_CMD="bun packages/coding-agent/src/cli.ts"
    echo -e "✔ 使用本地 Bun 原始碼命令: $OMP_CMD"
fi

# ------------------------------------------------------------------------------
# 測試 1: 未知旗標 (Single unknown flag)
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}▶ 測試 1: 單一未知 Flag 參數報錯${NC}"
OUTPUT=$($OMP_CMD --unknown-param 2>&1 || true)
EXPECTED="錯誤: 未知的參數 (Flag)：--unknown-param"

if echo "$OUTPUT" | grep -q "$EXPECTED"; then
    report_pass "成功捕獲並呈現正體中文: $EXPECTED"
else
    report_fail "單一未知 Flag 測試失敗" "$EXPECTED" "$OUTPUT"
fi

# ------------------------------------------------------------------------------
# 測試 2: 多個未知旗標 (Multiple unknown flags)
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}▶ 測試 2: 多個未知 Flag 參數報錯${NC}"
OUTPUT=$($OMP_CMD --foo-param --bar-param 2>&1 || true)
EXPECTED="錯誤: 未知的參數 (Flag)：--foo-param, --bar-param"

if echo "$OUTPUT" | grep -q "$EXPECTED"; then
    report_pass "成功捕獲複數未知參數: $EXPECTED"
else
    report_fail "複數未知 Flag 測試失敗" "$EXPECTED" "$OUTPUT"
fi

# ------------------------------------------------------------------------------
# 測試 3: 提示請執行 --help (Help hint in Traditional Chinese)
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}▶ 測試 3: 正體中文 Help 提示語${NC}"
OUTPUT=$($OMP_CMD --test-invalid-xyz 2>&1 || true)
EXPECTED="請執行 \`omp --help\` 檢視可用參數。"

if echo "$OUTPUT" | grep -q "請執行" && echo "$OUTPUT" | grep -q "檢視可用參數"; then
    report_pass "成功顯示正體中文 Help 指引: $EXPECTED"
else
    report_fail "Help 提示語測試失敗" "$EXPECTED" "$OUTPUT"
fi

# ------------------------------------------------------------------------------
# 測試 4: 核心轉譯字典與樣板全集測試 (Unit & Pattern test)
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}▶ 測試 4: 核心轉譯模組全量字典與正則測試${NC}"
if bun scripts/test-error-localization.mjs > /dev/null 2>&1; then
    report_pass "8 大分類 100% 正則與白名單測試通過"
else
    report_fail "核心模組測試未通過" "全部通過" "請執行 bun scripts/test-error-localization.mjs 檢視詳細錯誤"
fi

# ------------------------------------------------------------------------------
# 測試 5: Bun 原生單元測試套件
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}▶ 測試 5: Bun 原生單元測試套件 (error & help localization)${NC}"
if bun test packages/coding-agent/test/error-localization.test.ts packages/coding-agent/test/help-localization.test.ts > /dev/null 2>&1; then
    report_pass "16 個情境與 40+ 個 expect 斷言全部通過"
else
    report_fail "Bun test 未通過" "pass" "請執行 bun test 檢視詳細錯誤"
fi

# ------------------------------------------------------------------------------
# 測試 6: omp --help 參數正體中文說明檢驗
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}▶ 測試 6: omp --help 參數與章節正體中文檢視${NC}"
HELP_OUTPUT=$($OMP_CMD --help 2>&1 || true)

if echo "$HELP_OUTPUT" | grep -q "使用方式 (USAGE)" && echo "$HELP_OUTPUT" | grep -q "旗標選項 (FLAGS)"; then
    report_pass "Help 章節標題成功顯示正體中文 (使用方式 / 旗標選項)"
else
    report_fail "Help 章節標題測試失敗" "使用方式 (USAGE)" "$HELP_OUTPUT"
fi

if echo "$HELP_OUTPUT" | grep -q "指定使用的 Model"; then
    report_pass "核心 Flag (--model) 成功顯示正體中文說明"
else
    report_fail "Flag 正體中文說明測試失敗" "指定使用的 Model" "$HELP_OUTPUT"
fi

# ------------------------------------------------------------------------------
# 結算報告
# ------------------------------------------------------------------------------
echo -e "\n${BLUE}======================================================${NC}"
echo -e "  測試總數: $TOTAL_TESTS"
echo -e "  通過數量: ${GREEN}$PASSED_TESTS${NC}"
if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "  失敗數量: ${GREEN}0${NC}"
    echo -e "${GREEN}🎉 恭喜！所有 E2E 錯誤正體中文檢視測試 100% 通過！${NC}"
    echo -e "${BLUE}======================================================${NC}\n"
    exit 0
else
    echo -e "  失敗數量: ${RED}$FAILED_TESTS${NC}"
    echo -e "${RED}❌ 測試未完全通過，請檢查上方紀錄。${NC}"
    echo -e "${BLUE}======================================================${NC}\n"
    exit 1
fi
