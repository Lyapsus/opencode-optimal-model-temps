const TEMPERATURE_EPSILON = 1e-3

const TEMPERATURE_RULES = [
  {
    provider: "google",
    match: /gemini-3-pro/,
    target: Number(process.env.OPENCODE_GEMINI3_TEMPERATURE ?? "0.35"),
    baseline: Number(process.env.OPENCODE_GEMINI3_BASELINE ?? "1"),
  },
]

function findRule(model) {
  const provider = (model?.providerID ?? "").toLowerCase()
  const modelId = (model?.modelID ?? model?.api?.id ?? "").toLowerCase()

  return TEMPERATURE_RULES.find((rule) => {
    if (provider !== rule.provider.toLowerCase()) return false
    return rule.match.test(modelId)
  })
}

function isDefaultTemperature(current, baseline) {
  if (baseline === undefined || !Number.isFinite(baseline)) {
    return current === undefined
  }
  if (current === undefined) return true
  return Math.abs(current - baseline) < TEMPERATURE_EPSILON
}

export const OptimalModelTemperaturesPlugin = async () => ({
  "chat.params": async ({ model }, output) => {
    const rule = findRule(model)
    if (!rule || !Number.isFinite(rule.target)) return
    if (!isDefaultTemperature(output.temperature, rule.baseline)) return

    output.temperature = rule.target
  },
})
