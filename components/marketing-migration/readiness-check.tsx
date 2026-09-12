"use client";
import { useEffect, useRef, useState } from "react";
import { InquiryHandoff } from "./inquiry-handoff";
import { readinessInquiryDraft } from "@/lib/workflow-inquiry";
import { SkyArrow } from "@/components/sky/arrow";
import { readinessQuestions } from "@/lib/marketing-migration-tools/readinessQuestions";
import { recommendReadiness } from "@/lib/marketing-migration-tools/recommendReadiness";
import { trackEvent } from "@/lib/analytics/trackEvent";

export function ReadinessCheck(){
 const [index,setIndex]=useState(0);
 const [answers,setAnswers]=useState<Record<string,string>>({});
 const [finished,setFinished]=useState(false);
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{if(finished)heading.current?.focus();},[finished]);
 const question=readinessQuestions[index];
 if(finished){const result=recommendReadiness(answers);return <section className="mm-audit mm-audit-result"><p className="sp-kicker">YOUR NEXT STEP</p><h2 tabIndex={-1} ref={heading}>{result.title}</h2><p>{result.description}</p><ul className="mm-checklist">{result.steps.map(step=><li key={step}>{step}</li>)}</ul><details className="mm-audit-summary"><summary>Review your answers</summary><dl>{readinessQuestions.map(item=><div key={item.id}><dt>{item.question}</dt><dd>{answers[item.id]}</dd></div>)}</dl></details><InquiryHandoff draft={readinessInquiryDraft(answers)} label="Use these answers in my inquiry" /><div className="mm-audit-actions"><button type="button" className="mm-audit-back" onClick={()=>{setFinished(false);setIndex(0);setAnswers({});}}>Start again</button></div><p className="mm-note">This recommendation is based on your answers. Nothing has been submitted.</p></section>;}
 return <form className="mm-audit" onSubmit={event=>{event.preventDefault();if(!answers[question.id])return;if(index===readinessQuestions.length-1){trackEvent("audit_completed",{score:recommendReadiness({...answers}).score});setFinished(true);}else setIndex(index+1);}}><div className="mm-audit-progress"><span>YOUR WORKFLOW</span><span>{index+1} / {readinessQuestions.length}</span></div><progress value={index} max={readinessQuestions.length} aria-label="Questions completed" /><fieldset key={question.id}><legend>{question.question}</legend><div className="mm-audit-options">{question.options.map(option=><label key={option}><input type="radio" name={question.id} value={option} checked={answers[question.id]===option} onChange={()=>setAnswers({...answers,[question.id]:option})} required />{option}</label>)}</div></fieldset><div className="mm-audit-actions"><button className="mm-audit-back" type="button" disabled={index===0} onClick={()=>setIndex(index-1)}>Back</button><button className="sp-button" type="submit" disabled={!answers[question.id]}>{index===readinessQuestions.length-1?"See your next step":"Next question"}<span><SkyArrow /></span></button></div></form>;
}
