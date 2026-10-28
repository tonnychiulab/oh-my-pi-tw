import "@oh-my-pi/pi-utils/env";
import chalk from "@oh-my-pi/pi-utils/chalk";
import { APP_NAME, CONFIG_DIR_NAME } from "@oh-my-pi/pi-utils/dirs";

export function getExtraHelpText(): string {
	return `${chalk.bold("環境變數 (Environment Variables):")}
  ${chalk.dim("# 核心模型供應商 (Core Providers)")}
  ANTHROPIC_API_KEY          - Anthropic Claude models
  ANTHROPIC_OAUTH_TOKEN      - Anthropic OAuth (takes precedence over API key)
  CLAUDE_CODE_USE_FOUNDRY    - Enable Anthropic Foundry mode (uses Foundry endpoint + mTLS)
  FOUNDRY_BASE_URL           - Anthropic Foundry base URL (e.g., https://<foundry-host>)
  ANTHROPIC_FOUNDRY_API_KEY  - Anthropic token used as Authorization: Bearer <token> in Foundry mode
  ANTHROPIC_CUSTOM_HEADERS   - Extra headers for Foundry or any custom ANTHROPIC_BASE_URL gateway (e.g., "user-id: USERNAME")
  CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS - Omit pre-release Anthropic fields (context_management, beta tool fields, task budgets, thinking.block_binding) for gateways that reject them
  CLAUDE_CODE_CLIENT_CERT    - Client certificate (PEM path or inline PEM) for mTLS
  CLAUDE_CODE_CLIENT_KEY     - Client private key (PEM path or inline PEM) for mTLS
  NODE_EXTRA_CA_CERTS        - CA bundle path (or inline PEM) for server certificate validation
  OPENAI_API_KEY             - OpenAI GPT models
  GEMINI_API_KEY             - Google Gemini models
  COPILOT_GITHUB_TOKEN      - GitHub Copilot

  ${chalk.dim("# 其他 LLM 供應商 (Additional LLM Providers)")}
  AZURE_OPENAI_API_KEY       - Azure OpenAI models
  GROQ_API_KEY               - Groq models
  CEREBRAS_API_KEY           - Cerebras models
  XAI_API_KEY                - xAI Grok models
  OPENROUTER_API_KEY         - OpenRouter aggregated models
  KILO_API_KEY               - Kilo Gateway models
  MISTRAL_API_KEY            - Mistral models
  ZAI_API_KEY                - z.ai models (ZhipuAI/GLM)
  UMANS_AI_CODING_PLAN_API_KEY - Umans AI Coding Plan models
  ABLITERATION_API_KEY       - Abliteration uncensored GLM models
  UMANS_WEBSEARCH_PROVIDER    - Umans gateway web search backend (native or exa)
  MINIMAX_API_KEY            - MiniMax models
  OPENCODE_API_KEY           - OpenCode Zen/OpenCode Go models
  CURSOR_ACCESS_TOKEN        - Cursor AI models
  CLINE_API_KEY              - ClinePass subscription models
  COMMAND_CODE_API_KEY       - Command Code Provider API models
  CHARM_HYPER_API_KEY        - Charm Hyper inference gateway models
  AI_GATEWAY_API_KEY         - Vercel AI Gateway
  STEPFUN_API_KEY            - StepFun Step models
  HELMCODE_API_KEY           - Helmcode private EU inference
  WAFER_SERVERLESS_API_KEY   - Wafer Serverless (pay-as-you-go)
  YOLO_AUTO_API_KEY          - Yolo-Auto flat-rate Qwen models
  SINGULARITYAPI_DEV_API_KEY - SingularityAPI universal gateway (300+ models)
  SINGULARITYAPI_TECH_API_KEY - SingularityAPI reserved DeepSeek lanes

  ${chalk.dim("# 雲端平台供應商 (Cloud Providers)")}
  AWS_PROFILE                - AWS Bedrock (or AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY)
  GOOGLE_CLOUD_PROJECT       - Google Vertex AI (requires GOOGLE_CLOUD_LOCATION)
  GOOGLE_APPLICATION_CREDENTIALS - Service account for Vertex AI

  ${chalk.dim("# 搜尋與擴充工具 (Search & Tools)")}
  EXA_API_KEY                - Exa web search
  BRAVE_API_KEY              - Brave web search
  PERPLEXITY_API_KEY         - Perplexity web search API key (optional; anonymous fallback)
  PERPLEXITY_COOKIES         - Perplexity web search (session cookie)
  TAVILY_API_KEY             - Tavily web search
  TINYFISH_API_KEY           - TinyFish web search
  FIRECRAWL_API_KEY          - Firecrawl web search + fetch reader backend
  ANTHROPIC_SEARCH_API_KEY   - Anthropic web search (override; isolates search from main ANTHROPIC_API_KEY)
  ANTHROPIC_SEARCH_BASE_URL  - Anthropic web search base URL (override; pairs with ANTHROPIC_SEARCH_API_KEY)
  TYPESAFE_API_KEY           - TypeSafe System One judgments (auto thinking, unexpected-stop, AI staging, eval judge())

  ${chalk.dim("# 環境與目錄配置 (Configuration)")}
  OMP_PROFILE                 - 指定隔離 Agent 狀態的命名 Profile（等同於 --profile）
  使用 \`omp --profile <名稱> --alias <指令>\` 為指定的 Profile 建立 Shell 快捷指令
  PI_CODING_AGENT_DIR        - Session 歷史儲存目錄（預設：~/${CONFIG_DIR_NAME}/agent）
  PI_PACKAGE_DIR             - 覆寫套件安裝目錄（適用於 Nix/Guix 存放路徑）
  PI_SMOL_MODEL              - 覆寫輕量/快速任務的 Smol Model（參閱 --smol）
  PI_SLOW_MODEL              - 覆寫深度推理解析的 Slow Model（參閱 --slow）
  PI_PLAN_MODEL              - 覆寫架構規劃專用的 Plan Model（參閱 --plan）
  PI_NO_PTY                  - 停用基於 PTY 的互動式 Bash 執行環境
  完整環境變數參考文件請參閱：
  ${chalk.dim("docs/environment-variables.md")}
${chalk.bold("內建可用工具 (Available Tools，預設全啟用):")}
  read          - 讀取檔案內容
  bash          - 執行 Bash 指令
  edit          - 透過搜尋/取代編輯檔案
  write         - 寫入檔案（新建或覆寫）
  grep          - 搜尋檔案內容文字
  glob          - 透過萬用字元 (Glob) 搜尋比對檔案路徑
  lsp           - 語言伺服器協定 LSP（程式碼智慧感知與跳轉）
  python        - 執行 Python 程式碼（需要：${APP_NAME} setup python）
  notebook      - 檢視與編輯 Jupyter Notebook 筆記本
  browser       - 瀏覽器自動化操作 (Puppeteer)
  computer      - 本地主機桌面截圖與鍵鼠操作（預設停用）
  task          - 啟動 Sub-agents 執行平行分散任務
  todo          - 管理待辦事項清單 (Todo / Task lists)
  web_search    - 執行網路搜尋
  ask           - 向使用者發出互動式提問（僅限互動模式）

${chalk.bold("外掛選項 (Plugin Options):")}
  --plugin-dir <路徑>        從指定目錄載入 Plugin（可重複指定）

${chalk.bold("常用輔助指令 (Useful Commands):")}
  omp agents unpack           - 匯出內建的 Subagents 至 ~/.omp/agent/agents（預設目錄）
  omp agents unpack --project - 匯出內建的 Subagents 至目前專案的 ./.omp/agents 目錄`;
}
