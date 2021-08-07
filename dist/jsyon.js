!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.jsyon=t():e.jsyon=t()}(this,(function(){return(()=>{"use strict";var e={d:(t,s)=>{for(var r in s)e.o(s,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:s[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function s(e){return e.replace(/[\/.*+?^${}()|[\]\\\-]/g,"\\$&")}e.r(t),e.d(t,{Global:()=>c,Interpreter:()=>a,Parser:()=>o});class r{constructor(e,t){this.tokens=t,this.tokenLength=e}toString(){return 1===this.tokenLength?`[${s(this.tokens.join(""))}]`:`(?:${this.tokens.map(s).join("|")})`}}class i{constructor(e){this.quote=e}toString(){return`(?:${this.quote})((?:\\\\${this.quote}|.|\\n)*?)(?:${this.quote})`}}class o{static tokenCollections=[new r(2,["+=","-=","/=","*="]),new r(1,["=","+","-","/","*",",",":","[","]","{","}","(",")","@"])];static quoteBlocks=[new i('"'),new i("`"),new i("'")];static blockOpenSymbols={"{":"}","[":"]","(":")"};static blockCloseSymbols={"}":"{","]":"{",")":"("};static tokenizerRegExp=new RegExp(o.quoteBlocks.join("|")+`|(?:\\d|\\w|\\\\(?:${o.tokenCollections.join("|")}))+|`+o.tokenCollections.join("|"),"gmi");constructor(e,t=null){this.tokens=t||[...e.matchAll(o.tokenizerRegExp)].map((e=>e.reverse().find((e=>void 0!==e)))),this.position=0,this.tokensCount=this.tokens.length,this.body=[],this.blockParsers={"{":this.parseObjectBlock.bind(this),"[":this.parseArrayBlock.bind(this),"(":this.parseOperatorBlock.bind(this)}}current(){return this.tokens[this.position]}next(){return this.position++,this.current()}push(e){this.body.push(e)}prepareString(e){return e?e.replace(/\\(.)/gim,"$1"):""}buildExpr(e,t){let s={};return(e=e.filter((e=>e)).reduce(((e,t)=>(e[t]=1,e)),{})).raw&&(s["@__raw"]=1),e["@"]&&(s["@__follow_ctx"]=1),e.last?s["@__last"]=this.getArrayTopLevelItems(t).map((e=>new o(null,e).parse())):s["@__expr"]=new o(null,this.getArrayTopLevelItems(t)[0]).parse(),s}getArrayTopLevelItems(e){let t,s=[],r=0,i=0,n=e.length,l=[];for(;i<n;){if(t=e[i],i++,o.blockOpenSymbols[t])r++;else if(o.blockCloseSymbols[t])r--;else if(","===t&&0===r){s.push(l),l=[];continue}l.push(t),i==n&&s.push(l)}return s}parseArrayBlock(e){let t=this.getArrayTopLevelItems(e),s=[];for(let e of t){let t=e.indexOf(":");-1!==t?s.push(this.buildExpr(e.slice(0,t),"["===e[t+1]?e.slice(t+2,e.length-1):e.slice(t+1,e.length))):s.push(this.prepareString(e.join("")))}return s}parseObjectBlock(e){return this.parseArrayBlock(e)[0]}parseOperatorBlock(e){return`(${e.join("")})`}parseBlock(){let e,t=1,s=this.current(),r=o.blockOpenSymbols[s],i=[];for(;this.position<this.tokensCount;){if(e=this.next(),e===s)t++;else if(e===r&&0==--t)break;i.push(e)}this.next(),this.body.push(this.blockParsers[s](i))}parse(){let e;for(;this.position<this.tokensCount;)e=this.current(),o.blockOpenSymbols[e]?(this.parseBlock(),e=this.current()):(this.push(this.prepareString(e)),this.next());return this.body}}let n,l="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:globalThis;const c=n={js:l,eval:(e,t)=>new a(new o(e).parse(),t).run(),zip:(...e)=>e[0].map(((t,s)=>e.map((e=>e[s])))),print:(...e)=>(console.log(...e),e),Obj:(...e)=>e.reduce(((e,t)=>(e[t[0]]=t[1],e)),{}),Arr:(...e)=>e,Fn(...e){let t=e[e.length-1],s=e.slice(0,e.length-1);return(...e)=>{let r=n.Obj(...n.zip(s,e));return new a(t,r).run()}},Num:e=>new Number(e),Str:e=>new String(e)};let h;const p=h={"(new)":(e,t,s,r)=>new e.prevPlace(...r),"(as-context)":(e,t,s,r)=>r[0],"(through)":(e,t,s,r)=>e.prevPlace,"(then-else)":(e,t,s,r)=>e.prevPlace?r[0]:r[1],"(else)":(e,t,s,r)=>e.prevPlace?e.prevPlace:r[0],"(then)":(e,t,s,r)=>e.prevPlace?r[0]:e.prevPlace,"(map)":(e,t,s,r)=>{let i=r[0];return e.prevPlace.map(((e,t)=>i(e,t)))},"(reduce)":(e,t,s,r)=>{let i=r[1];return e.prevPlace.reduce(((e,t,s)=>i(e,t,s)),r[0])},"=":(e,t,s,r)=>(t[s]=r[0],r[0]),"+=":(e,t,s,r)=>t[s]+=r[0],"-=":(e,t,s,r)=>t[s]-=r[0],"/=":(e,t,s,r)=>t[s]/=r[0],"*=":(e,t,s,r)=>t[s]*=r[0],"+":(e,t,s,r)=>e.prevPlace+r[0],"-":(e,t,s,r)=>e.prevPlace-r[0],"/":(e,t,s,r)=>e.prevPlace/r[0],"*":(e,t,s,r)=>e.prevPlace*r[0]};class a{constructor(e,t,s){this.entryTypeMethods=new Map,this.entryTypeMethods.set(String,this.processStringEntry.bind(this)),this.entryTypeMethods.set(Array,this.processArrayEntry.bind(this)),this.entryTypeMethods.set(Object,this.processObjectEntry.bind(this)),this.entryTypeMethods.set(Number,this.processStringEntry.bind(this)),this.position=0,this.prevPlace,this.curPlace=s,this.path=e,this.context=t}findStartElements(e){switch(e){case"this":this.curPlace=this.context,this.position++;break;case"global":this.curPlace=c,this.position++;break;default:this.curPlace=c}}processStringEntry(e){if(0!==this.position||null!=this.curPlace){if(p[e]){let t=this.prevPlace,s=this.path[this.position-1];return this.prevPlace=this.curPlace,this.curPlace=(...r)=>p[e](this,t,s,r),void this.position++}null!=this.curPlace&&(this.prevPlace=this.curPlace,this.curPlace=this.curPlace[e]),this.position++}else this.findStartElements(e)}processArrayEntry(e){let t=[];for(let s of e)null!=s&&s.constructor===Object?t.push(this.processObject(s)):t.push(s);let s=this.curPlace;this.curPlace=this.curPlace.apply(this.prevPlace,t),this.prevPlace=s,this.position++}processObjectEntry(e){if(this.prevPlace=this.curPlace,0===this.position&&null==this.curPlace)return this.findStartElements(),this.prevPlace=this.curPlace,this.curPlace=this.processObject(e),void this.position++;null!=this.curPlace&&(this.curPlace=this.curPlace[this.processObject(e)]),this.position++}processObject(e){let t;if(e["@__raw"])return void 0!==e["@__last"]?["this","(as-context)",[{"@__last":e["@__last"]}]]:e["@__expr"];if(e["@__follow_ctx"]&&(t=this.context),void 0!==e["@__expr"])return new a(e["@__expr"],t||this.prevPlace).run();if(void 0!==e["@__last"]){let s;for(let r of e["@__last"])s=new a(r,t||this.prevPlace).run();return s}let s=Object.getOwnPropertyNames(e);for(let t of s){let s=e[t];null!=s&&s.constructor===Object&&(e[t]=this.processObject(s))}return e}run(){let e,t;for(;t=this.path[this.position];)(e=this.entryTypeMethods.get(t.constructor))?e(t):this.position++;return this.curPlace}}return t})()}));