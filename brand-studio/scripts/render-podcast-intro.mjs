#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {introSVG,DURATION} from '../podcast-intro-motion.mjs';
const require=createRequire(import.meta.url),sharp=require('sharp');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'assets/podcast-kit-blue-sweep');
const layers=JSON.parse(fs.readFileSync(path.join(output,'motion-source/layers.json')));
const fps=30,frames=Math.round(DURATION*fps);
const mode=process.argv.includes('--alpha')?'alpha':'full';
const storyboard=process.argv.includes('--storyboard');
if(storyboard){
 for(const t of [0,.35,.7,1.05,1.4,1.85,2.3,2.8,3.25,4.5]){
  await sharp(Buffer.from(introSVG(t,layers))).png().toFile(path.join(output,`motion-source/beat-${t}.png`));
 }
 console.log('Storyboard rendered.');
}else{
 const file=path.join(output,mode==='alpha'?'intro-logo-transparent.mov':'intro-connection.mp4');
 const args=['-hide_banner','-loglevel','error','-y','-f','image2pipe','-framerate',String(fps),'-i','pipe:0','-an'];
 if(mode==='alpha')args.push('-c:v','prores_ks','-profile:v','4','-pix_fmt','yuva444p10le','-vendor','apl0');
 else args.push('-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-movflags','+faststart');
 args.push(file);
 const encoder=spawn('ffmpeg',args,{stdio:['pipe','ignore','pipe']});
 let errors='';encoder.stderr.on('data',b=>errors+=b);const finished=once(encoder,'close');
 for(let i=0;i<frames;i++){
  const png=await sharp(Buffer.from(introSVG(i/fps,layers,{transparent:mode==='alpha'}))).png().toBuffer();
  if(!encoder.stdin.write(png))await once(encoder.stdin,'drain');
 }
 encoder.stdin.end();const [code]=await finished;if(code!==0)throw Error(errors);
 console.log(`${mode}: ${file}, ${DURATION}s, ${fps} fps`);
}
