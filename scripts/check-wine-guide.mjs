import assert from 'node:assert/strict';
import { WINES } from '../src/data/wines.ts';
import { recommendWines } from '../src/lib/wine-guide.ts';
const wines=WINES.map(w=>({...w,structure:w.profile.structure}));let count=0;
for(const occasion of ['table','celebration','quiet'])for(const taste of ['fresh','rounded','red','sweet'])for(const curiosity of ['classic','regional','explore']){
 const answers={occasion,taste,curiosity};const picks=recommendWines(wines,answers);
 assert.equal(picks.length,3);assert.equal(new Set(picks.map(p=>p.wine.slug)).size,3);
 assert.ok(picks.every(p=>p.wine.availability.producer!=='archive'&&p.reasons.length));
 if(taste==='fresh')assert.ok(picks.every(p=>['white','sparkling'].includes(p.wine.colour)&&(!p.wine.structure||p.wine.structure.sweetness<=2)));
 if(taste==='rounded')assert.ok(picks.every(p=>p.wine.colour==='white'));
 if(taste==='red')assert.ok(picks.every(p=>p.wine.colour==='red'));
 if(taste==='sweet')assert.ok(picks.every(p=>p.wine.colour==='dessert'||p.wine.structure?.sweetness>=3));
 assert.deepEqual(recommendWines([...wines].reverse(),answers),picks);count++;
}
assert.deepEqual(recommendWines([],{occasion:'quiet',taste:'red',curiosity:'classic'}),[]);
assert.equal(recommendWines(wines.slice(0,1),{occasion:'quiet',taste:'fresh',curiosity:'classic'}).length,1);
console.log(`${count} answer combinations: unique, deterministic, non-archive recommendations; red/sweet preferences respected. Empty and small catalogues handled.`);
