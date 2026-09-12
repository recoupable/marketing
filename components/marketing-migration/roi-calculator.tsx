"use client";

import { useState } from "react";
import { calculateWorkflowROI, type ROIInputs } from "@/lib/marketing-migration-tools";
import { roiInquiryDraft } from "@/lib/workflow-inquiry";
import { InquiryHandoff } from "./inquiry-handoff";
import { SkyArrow } from "@/components/sky/arrow";

const fields: { id: keyof ROIInputs; label: string; max: number; step: number; unit: string }[] = [
  { id: "monthlyHours", label: "Hours spent on this workflow each month", max: 500, step: 0.5, unit: "hours" },
  { id: "hourlyCost", label: "Fully loaded cost per hour", max: 300, step: 1, unit: "USD" },
  { id: "timeReduction", label: "Time reduction to model", max: 100, step: 1, unit: "%" },
  { id: "monthlySystemCost", label: "Ongoing system cost each month", max: 10000, step: 1, unit: "USD" },
  { id: "setupCost", label: "One-time setup cost", max: 100000, step: 1, unit: "USD" },
];
const usd = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);

export function ROICalculator() {
  const [values, setValues] = useState<Record<keyof ROIInputs, string>>({ monthlyHours: "40", hourlyCost: "40", timeReduction: "50", monthlySystemCost: "100", setupCost: "2500" });
  const inputs = Object.fromEntries(fields.map(field => [field.id, Number(values[field.id])])) as ROIInputs;
  const isValid = (id: keyof ROIInputs, max: number) => values[id].trim() !== "" && Number.isFinite(inputs[id]) && inputs[id] >= 0 && inputs[id] <= max;
  const result = fields.every(field => isValid(field.id, field.max)) ? calculateWorkflowROI(inputs) : null;

  return <div className="mm-tool">
    <div className="mm-tool-mobile-summary">
      <p>{result ? <><strong>{result.hoursSaved.toLocaleString("en-US", { maximumFractionDigits: 2 })} hours</strong><span>Potential time freed / month</span></> : <span>Check your assumptions</span>}</p>
      <a href="#roi-result">View scenario <SkyArrow direction="down" /></a>
    </div>
    <div className="mm-tool-inner">
    <div className="mm-tool-controls">
      <h2>Set your assumptions.</h2>
      <p>Type an exact amount or move a slider. Model one workflow, including review time and ongoing costs.</p>
      {fields.map(field => {
        const invalid = !isValid(field.id, field.max);
        return <div className="mm-range" key={field.id}>
          <label id={`${field.id}-label`} htmlFor={`${field.id}-number`}>{field.label}</label>
          <div className="mm-number-entry">
            <input id={`${field.id}-number`} type="number" inputMode="decimal" min={0} max={field.max} step="any" value={values[field.id]} aria-invalid={invalid || undefined} aria-describedby={`${field.id}-unit${invalid ? ` ${field.id}-error` : ""}`} onChange={event => setValues({ ...values, [field.id]: event.target.value })} />
            <span id={`${field.id}-unit`}>{field.unit}</span>
          </div>
          <input type="range" aria-label={`${field.label} — slider`} min={0} max={field.max} step={field.step} value={invalid ? 0 : inputs[field.id]} onChange={event => setValues({ ...values, [field.id]: event.target.value })} />
          {invalid && <p className="mm-input-error" id={`${field.id}-error`}>Enter an amount from 0 to {field.max.toLocaleString("en-US")}.</p>}
        </div>;
      })}
    </div>
    <section className="mm-tool-result" id="roi-result" tabIndex={-1} aria-label="Your scenario">
      <div aria-live="polite" aria-atomic="true">
        <p className="sp-kicker">YOUR SCENARIO</p>
        {result ? <>
          <div className="mm-result-number">{result.hoursSaved.toLocaleString("en-US", { maximumFractionDigits: 2 })}<small> hours / month</small></div>
          <p>Potential time freed up for other work.</p>
          <dl className="mm-result-breakdown">
            <div><dt>Monthly capacity value</dt><dd>{usd(result.capacityValue)}</dd></div>
            <div><dt>Ongoing monthly cost</dt><dd>{usd(inputs.monthlySystemCost)}</dd></div>
            <div><dt>Monthly value after ongoing cost</dt><dd>{usd(result.monthlyNetValue)}</dd></div>
            <div><dt>First-year value after all costs</dt><dd>{usd(result.firstYearNetValue)}</dd></div>
            <div><dt>Modeled payback</dt><dd>{result.paybackMonths === null ? "Not reached" : result.paybackMonths === 0 ? "No setup cost" : `${result.paybackMonths.toFixed(1)} months`}</dd></div>
          </dl>
        </> : <p className="mm-result-empty">Enter a valid value for each assumption to see the scenario.</p>}
      </div>
      <p>Time freed up is capacity, not automatically cash saved. This is a planning scenario, not a forecast or a Recoup quote.</p>
      {result && <InquiryHandoff draft={roiInquiryDraft(inputs)} label="Use this scenario in my inquiry" />}
    </section>
  </div></div>;
}
