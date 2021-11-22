!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.jsyon=e():t.jsyon=e()}(this,(function(){return(()=>{var t={147:(t,e,s)=>{const r=s(911);t.exports=class t{constructor(t,e,s,r){this.entryTypeMethods=new Map,this.entryTypeMethods.set(String,this.processStringEntry.bind(this)),this.entryTypeMethods.set(Array,this.processArrayEntry.bind(this)),this.entryTypeMethods.set(Object,this.processObjectEntry.bind(this)),this.entryTypeMethods.set(Number,this.processStringEntry.bind(this)),this.position=0,this.prevPlace,this.curPlace=r,this.path=e,this.context=s,this.global=t}findStartElements(t){switch(t){case"this":this.curPlace=this.context,this.position++;break;case"global":this.curPlace=this.global,this.position++;break;default:this.curPlace=this.global}}async processStringEntry(t){if(0!==this.position||null!=this.curPlace){if(r[t]){let e=this.prevPlace,s=this.path[this.position-1];return this.prevPlace=this.curPlace,this.curPlace=await r[t](this,e,s),void this.position++}null!=this.curPlace&&(this.prevPlace=this.curPlace,this.curPlace=this.curPlace[t]),this.position++}else this.findStartElements(t)}async processArrayEntry(t){let e=[];for(let s of t)null!=s&&s.constructor===Object?e.push(await this.processObject(s)):e.push(s);let s=this.curPlace;this.curPlace=await this.curPlace.apply(this.prevPlace,e),this.prevPlace=s,this.position++}async processObjectEntry(t){if(this.prevPlace=this.curPlace,0===this.position&&null==this.curPlace)return this.findStartElements(),this.prevPlace=this.curPlace,this.curPlace=await this.processObject(t),void this.position++;null!=this.curPlace&&(this.curPlace=this.curPlace[await this.processObject(t)]),this.position++}async processObject(e){let s;if(e["@__raw"])return void 0!==e["@__last"]?["this","(as-context)",[{"@__last":e["@__last"]}]]:e["@__expr"];if(e["@__follow_ctx"]&&(s=this.context),void 0!==e["@__expr"])return await new t(this.global,e["@__expr"],s||this.prevPlace).run();if(void 0!==e["@__last"]){let r;for(let i of e["@__last"])r=await new t(this.global,i,s||this.prevPlace).run();return r}let r=Object.getOwnPropertyNames(e);for(let t of r){let s=e[t];null!=s&&s.constructor===Object&&(e[t]=await this.processObject(s))}return e}async run(){let t,e;for(;e=this.path[this.position];)(t=this.entryTypeMethods.get(e.constructor))?await t(e):this.position++;return this.curPlace}}},911:t=>{t.exports={"(new)":(t,e,s)=>{let r=t.prevPlace;return(...t)=>new r(...t)},"(as-context)":(t,e,s)=>t=>t,"(through)":(t,e,s)=>{let r=t.prevPlace;return()=>r},"(then-else)":(t,e,s)=>{let r=t.prevPlace;return(t,e)=>r?t:e},"(else)":(t,e,s)=>{let r=t.prevPlace;return t=>r||t},"(then)":(t,e,s)=>{let r=t.prevPlace;return t=>r?t:r},"(map)":async(t,e,s)=>{let r=crx.prevPlace;return t=>Promise.all(r.map(((e,s)=>t(e,s))))},"(async)":async(t,e,s)=>{let r=t.prevPlace;return(...t)=>{let e=new Promise(((e,s)=>e(r(...t))));return()=>e}},"(reduce)":async(t,e,s)=>{let r=0,i=t.prevPlace;return async(t,e)=>{for(let s of i)await e(t,s,r),r++;return t}},"=":(t,e,s)=>t=>(e[s]=t,t),"+=":(t,e,s)=>t=>e[s]+=t,"-=":(t,e,s)=>t=>e[s]-=t,"/=":(t,e,s)=>t=>e[s]/=t,"*=":(t,e,s)=>t=>e[s]*=t,"+":(t,e,s)=>{let r=t.prevPlace;return t=>r+t},"-":(t,e,s)=>{let r=t.prevPlace;return t=>r-t},"/":(t,e,s)=>{let r=t.prevPlace;return t=>r/t},"*":(t,e,s)=>{let r=t.prevPlace;return t=>r*t}}},320:t=>{function e(t){return t.replace(/[\/.*+?^${}()|[\]\\\-]/g,"\\$&")}class s{constructor(t,e){this.tokens=e,this.tokenLength=t}toString(){return 1===this.tokenLength?`[${e(this.tokens.join(""))}]`:`(?:${this.tokens.map(e).join("|")})`}}class r{constructor(t){this.quote=t}toString(){return`(?:${this.quote})((?:\\\\${this.quote}|.|\\n)*?)(?:${this.quote})`}}t.exports=class t{static tokenCollections=[new s(2,["+=","-=","/=","*="]),new s(1,["=","+","-","/","*",",",":","[","]","{","}","(",")","@"])];static quoteBlocks=[new r('"'),new r("`"),new r("'")];static blockOpenSymbols={"{":"}","[":"]","(":")"};static blockCloseSymbols={"}":"{","]":"{",")":"("};static commentRegExp=new RegExp("(?:#\\*[\\s\\S]*?\\*#)|(?:#.*?$)","gmi");static tokenizerRegExp=new RegExp(t.quoteBlocks.join("|")+`|(?:\\d|\\w|\\\\(?:${t.tokenCollections.join("|")}))+|`+t.tokenCollections.join("|"),"gmi");constructor(e,s=null){e&&(e=e.replace(t.commentRegExp,"")),this.tokens=s||[...e.matchAll(t.tokenizerRegExp)].map((t=>t.reverse().find((t=>void 0!==t)))),this.position=0,this.tokensCount=this.tokens.length,this.body=[],this.blockParsers={"{":this.parseObjectBlock.bind(this),"[":this.parseArrayBlock.bind(this),"(":this.parseOperatorBlock.bind(this)}}current(){return this.tokens[this.position]}next(){return this.position++,this.current()}push(t){this.body.push(t)}prepareString(t){return t?t.replace(/\\(.)/gim,"$1"):""}buildExpr(e,s){let r={};return(e=e.filter((t=>t)).reduce(((t,e)=>(t[e]=1,t)),{})).raw&&(r["@__raw"]=1),e["@"]&&(r["@__follow_ctx"]=1),e.last?r["@__last"]=this.getArrayTopLevelItems(s).map((e=>new t(null,e).parse())):r["@__expr"]=new t(null,this.getArrayTopLevelItems(s)[0]).parse(),r}getArrayTopLevelItems(e){let s,r=[],i=0,n=0,o=e.length,l=[];for(;n<o;){if(s=e[n],n++,t.blockOpenSymbols[s])i++;else if(t.blockCloseSymbols[s])i--;else if(","===s&&0===i){r.push(l),l=[];continue}l.push(s),n==o&&r.push(l)}return r}parseArrayBlock(t){let e=this.getArrayTopLevelItems(t),s=[];for(let t of e){let e=t.indexOf(":");-1!==e?s.push(this.buildExpr(t.slice(0,e),"["===t[e+1]?t.slice(e+2,t.length-1):t.slice(e+1,t.length))):s.push(this.prepareString(t.join("")))}return s}parseObjectBlock(t){return this.parseArrayBlock(t)[0]}parseOperatorBlock(t){return`(${t.join("")})`}parseBlock(){let e,s=1,r=this.current(),i=t.blockOpenSymbols[r],n=[];for(;this.position<this.tokensCount;){if(e=this.next(),e===r)s++;else if(e===i&&0==--s)break;n.push(e)}this.next(),this.body.push(this.blockParsers[r](n))}parse(){let e;for(;this.position<this.tokensCount;)e=this.current(),t.blockOpenSymbols[e]?(this.parseBlock(),e=this.current()):(this.push(this.prepareString(e)),this.next());return this.body}}},468:(t,e,s)=>{const r=s(147),i=s(320);let n="undefined"!=typeof window?window:void 0!==s.g?s.g:"undefined"!=typeof self?self:globalThis;class o{constructor(t){this.__global=t}async wait_all(...t){return Promise.all(t.map((t=>t())))}}t.exports=class{constructor(t){this.__root_file_path=t,this.__root_dir_path=path.dirname(t),this.Js=n,this.async=new o(this),this.True=!0,this.False=!1}async eval(t,e){return new r(this,new i(t).parse(),e).run()}async eval_json(t,e){return new r(this,t,e).run()}zip(...t){return t[0].map(((e,s)=>t.map((t=>t[s]))))}print(...t){return console.log(...t),t}input(t=""){return prompt(t)}Obj(...t){return t.reduce(((t,e)=>(t[e[0]]=e[1],t)),{})}Arr(...t){return t}Fn(...t){let e=t[t.length-1],s=t.slice(0,t.length-1);return(...t)=>{let i=this.Obj(...this.zip(s,t));return new r(this,e,i).run()}}Num(t){return new Number(t)}Str(t){return new String(t)}}},164:(t,e,s)=>{const r=s(147),i=s(320),n=s(468);t.exports={Interpreter:r,Parser:i,Global:n}}},e={};function s(r){var i=e[r];if(void 0!==i)return i.exports;var n=e[r]={exports:{}};return t[r](n,n.exports,s),n.exports}return s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),s(164)})()}));