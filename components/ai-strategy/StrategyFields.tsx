import { aiStrategyCopy as copy } from "@/lib/copy/ai-strategy";
import type { StrategyInput } from "@/lib/ai-strategy/strategySchema";

export function StrategyFields({
  step,
  values,
  onChange,
}: {
  step: number;
  values: StrategyInput;
  onChange: (key: keyof StrategyInput, value: string) => void;
}) {
  const fields: (keyof StrategyInput)[][] = [
    ["workflow", "outcome", "purpose", "owner"],
    ["access", "example", "review", "baseline"],
    ["reviewDate", "success", "stop"],
  ];
  return (
    <div className={`strategy-fields strategy-fields-step-${step}`}>
      {step === 0 && (
        <div className="strategy-starters">
          <p>{copy.starterLabel}</p>
          <div>
            {copy.starters.map((starter) => (
              <button
                key={starter.label}
                type="button"
                aria-pressed={
                  values.workflow === starter.workflow &&
                  values.outcome === starter.outcome
                }
                onClick={() => {
                  onChange("workflow", starter.workflow);
                  onChange("outcome", starter.outcome);
                }}
              >
                {starter.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {fields[step].map((key) => {
        const common = {
          id: `strategy-${key}`,
          name: key,
          value: values[key],
          required: true,
          onChange: (
            event: React.ChangeEvent<
              HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >,
          ) => onChange(key, event.target.value),
        };
        const placeholder =
          key in copy.placeholders
            ? copy.placeholders[key as keyof typeof copy.placeholders]
            : undefined;
        return (
          <label
            key={key}
            htmlFor={common.id}
            className={`strategy-field-${key}`}
          >
            <span>{copy.fields[key]}</span>
            {key === "purpose" ? (
              <select {...common}>
                {Object.entries(copy.purposes).map(([value, item]) => (
                  <option key={value} value={value}>
                    {item.label}
                  </option>
                ))}
              </select>
            ) : ["access", "example", "review", "baseline"].includes(key) ? (
              <select {...common}>
                {Object.entries(copy.answers).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            ) : ["outcome", "success", "stop"].includes(key) ? (
              <textarea
                {...common}
                placeholder={placeholder}
                minLength={10}
                maxLength={400}
                rows={2}
              />
            ) : (
              <input
                {...common}
                type={key === "reviewDate" ? "date" : "text"}
                placeholder={placeholder}
                minLength={key === "workflow" ? 5 : 2}
                maxLength={key === "workflow" ? 180 : 100}
              />
            )}
          </label>
        );
      })}
    </div>
  );
}
