!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.jsyon=e():t.jsyon=e()}(this,(function(){return(()=>{var t={586:(t,e,r)=>{const s=r(558),n=r(477);let i="undefined"!=typeof window?window:void 0!==r.g?r.g:"undefined"!=typeof self?self:globalThis;class a{constructor(t,e,r,s=1){this.__global=t,this.a=e,this.b=r,this.step=s,this.length=(r-e)/s|0,this.current=e-s}next(){return this.current+=this.step}__to_arr__(){let t=[],e=this.a;for(;e<this.b;e+=this.step)t.push(e);return t}__to_str__(){return`${this.a}...${this.b}|${this.step}`}__get_attr__(t){return t?.constructor===Number?this.a+this.step*t:this[t]}}t.exports=class{constructor(){this.Js=i,this.True=!0,this.False=!1,this.Null=null,this.__import_cache=new Map,this.__native_typemap=new Map,this.__native_typemap.set(Object,this.Obj),this.__native_typemap.set(Array,this.Arr),this.__native_typemap.set(String,this.Str),this.__native_typemap.set(Number,this.Num),this.__native_typemap.set(Function,this.Fn),this.__native_typemap.set(a,this.Range)}async import(t,e=!0,r){return null}async eval(t,e){return new s(new n(t).parse()).run(this,e)}async eval_json(t,e){return new s(t).run(this,e)}zip(...t){const e=[],r=t.length;if(!r)return e;const s=t[0].length;let n=t[0];for(let t=0;t<s;t++)e.push([n[t]]);for(let i=1;i<r;i++){n=t[i];for(let t=0;t<s;t++)e[t].push(n[t])}return e}Obj(...t){const e={};for(let r=0,s=t.length;r<s;r++)e[t[r][0]]=t[r][1];return e}Arr(...t){if(1===t.length){let e=t[0];if(e?.__to_arr__)return e.__to_arr__()}return t}Fn(...t){let e=t[t.length-1],r=t.slice(0,t.length-1),n=(...t)=>{let i=this.Obj(...this.zip(r,t));return i.__fn__=n,i.__args__=t,i.__args_names__=r,s.runExprGlobal(this,e,i)};return n}Num(t){return+t}Str(t){return t?.__to_str__?t.__to_str__():t+""}Range(t,e,s=1){return new a(r.g,t,e,s)}typeof(t){if(void 0===t||t===this.Null)return this.Null;const e=Object.getPrototypeOf(t).constructor;return this.__native_typemap.has(e)?this.__native_typemap.get(e):this.Obj}print(...t){return null}input(t=""){return null}sleep(t=1e3,e){return new Promise(((r,s)=>setTimeout((()=>r(void 0===e?this:e)),t)))}exit(t=0){return null}}},266:t=>{t.exports=class{constructor(t){this.__global=t}async wait_all(...t){return Promise.all(t.map((t=>t())))}}},712:t=>{t.exports=class{constructor(t){this.__global=t}async multi_test_selector(...t){return async(...e)=>{const r=[],s=Promise.all(t.map((async t=>{await t[0](...e)&&r.push(t[1])})));return async(...t)=>{await s;const e=[];for(const s of r)e.push(await s(...t));return e}}}async test_selector(...t){return async(...e)=>{const r=(async()=>{for(const r of t)if(await r[0](...e))return r[1]})();return async(...t)=>(await r)?.(...t)}}async multi_match_selector(...t){return async e=>{const r=[],s=Promise.all(t.map((async t=>{t[0]===e&&r.push(t[1])})));return async(...t)=>{await s;const e=[];for(const s of r)e.push(await s(...t));return e}}}async match_selector(...t){return async e=>{const r=(async()=>{for(const r of t)if(r[0]===e)return r[1]})();return async(...t)=>(await r)?.(...t)}}async test(t,e){return async(...r)=>{const s=(async()=>await t(...r)?e:()=>this.__global.Null)();return async(...t)=>(await s)(...t)}}async match(t,e){return async r=>{let s=()=>this.__global.Null;return t===r&&(s=e),s}}}},301:t=>{t.exports=class{constructor(t){this.__global=t}async from_range(t){const e=(Math.random()*10**(1|Math.log10(Math.abs(t.length)))|0)%t.length;return t?.__get_attr__?t.__get_attr__(e):t[e]}}},558:(t,e,r)=>{const s=r(993);class n{static entryTypeMethods=new Map;static exprMap=new Map;static rawExprMap=new Map;constructor(t){this.position=0,this.path=t,this.hasStartingPoint=!1,this.executionQueue=[],this.initialization=this.init()}static runExprGlobal(t,e,r){if(n.exprMap.has(e))return n.exprMap.get(e).run(t,r);{const s=new n(e);return n.exprMap.set(e,s),s.run(t,r)}}async init(){let t,e;for(;void 0!==(e=this.path[this.position]);)(t=n.entryTypeMethods.get(e.constructor))?await t.call(this,e):this.position++}setStartingPoint(t){switch(t){case"~>":this.executionQueue.push((async t=>{t.curPlace=t.context})),this.position++;break;case"global":this.executionQueue.push((async t=>{t.curPlace=t.global})),this.position++;break;default:this.executionQueue.push((async t=>{t.curPlace=t.global}))}this.hasStartingPoint=!0}async processStringEntry(t){if(t?.constructor!==String||isNaN(parseInt(t)))if(0!==this.position||this.hasStartingPoint){if(s.has(t)){const e=this.path[this.position-1];return this.executionQueue.push((async r=>{const n=r.prevPlace;r.prevPlace=r.curPlace,r.curPlace=await s.get(t)(r,n,e)})),void this.position++}this.executionQueue.push((async e=>{void 0!==e.curPlace&&(e.prevPlace=e.curPlace,e.curPlace=e.curPlace?.__get_attr__?e.curPlace.__get_attr__(t):e.curPlace?.[t])})),this.position++}else this.setStartingPoint(t);else this.path[this.position]=+t}async processNumberEntry(t){0!==this.position||this.hasStartingPoint||(this.executionQueue.push((async e=>{e.curPlace={[t]:t}})),this.hasStartingPoint=!0),this.processStringEntry(t)}async processArrayEntry(t){this.executionQueue.push((async e=>{let r=[];for(let s=0,n=t.length;s<n;s++){const n=t[s];n?.constructor===Object?n["@__unpack_arr_args"]?r.push(...await this.processObject(e,n)):r.push(await this.processObject(e,n)):r.push(n)}let s=e.curPlace;e.curPlace=await e.curPlace.apply(e.prevPlace,r),e.prevPlace=s})),this.position++}async processObjectEntry(t){if(0===this.position&&!this.hasStartingPoint)return this.setStartingPoint(),this.executionQueue.push((async e=>{e.prevPlace=e.curPlace,e.curPlace=await this.processObject(e,t)})),void this.position++;void 0!==this.curPlace&&this.executionQueue.push((async e=>{e.prevPlace=e.curPlace,e.curPlace=e.curPlace[await this.processObject(e,t)]})),this.position++}async processObject(t,e){let r;if(e["@__raw"]){if(void 0!==e["@__last"]){let t=n.rawExprMap.get(e["@__last"]);return t||(n.rawExprMap.set(e["@__last"],t=["~>","(as-context)",[{"@__last":e["@__last"]}]]),t)}return e["@__expr"]}if(e["@__follow_ctx"]&&(r=t.context),void 0!==e["@__expr"])return n.runExprGlobal(t.global,e["@__expr"],r||t.prevPlace);if(void 0!==e["@__last"]){const s=e["@__last"];if(r||=t.prevPlace,e["@__async"]){const e=[];for(let i=0,a=s.length;i<a;i++)e.push(n.runExprGlobal(t.global,s[i],r));return await Promise.all(e),e.length?e[e.length-1]:t.global.Null}let i;for(let e=0,a=s.length;e<a;e++)i=await n.runExprGlobal(t.global,s[e],r);return i}let s=Object.getOwnPropertyNames(e);for(let r=0,n=s.length;r<n;r++){const n=s[r],i=e[n];null!=i&&i.constructor===Object&&(e[n]=await this.processObject(t,i))}return e}async run(t,e){await this.initialization;const r={global:t,context:e,prevPlace:void 0,curPlace:void 0};for(let t=0,e=this.executionQueue.length;t<e;t++)await this.executionQueue[t](r);return r.curPlace}}n.entryTypeMethods.set(String,n.prototype.processStringEntry),n.entryTypeMethods.set(Array,n.prototype.processArrayEntry),n.entryTypeMethods.set(Object,n.prototype.processObjectEntry),n.entryTypeMethods.set(Number,n.prototype.processNumberEntry),t.exports=n},993:t=>{const e={"(new)":(t,e,r)=>{let s=t.prevPlace;return(...t)=>new s(...t)},"(as-context)":(t,e,r)=>t=>t,"(through)":(t,e,r)=>{let s=t.prevPlace;return()=>s},"(then-else)":(t,e,r)=>{let s=t.prevPlace;return(t,e)=>s?t:e},"(else)":(t,e,r)=>{let s=t.prevPlace;return t=>s||t},"(then)":(t,e,r)=>{let s=t.prevPlace;return t=>s?t:s},"(map)":async(t,e,r)=>{let s=t.prevPlace;return t=>Promise.all(s.map(((e,r)=>t(e,r))))},"(reduce)":async(t,e,r)=>{let s=t.prevPlace;return async(t,e)=>{for(let r=0,n=s.length;r<n;r++)t=await e(t,s[r],r);return t}},"(async)":async(t,e,r)=>{let s=t.prevPlace;return(...t)=>{let e=new Promise(((e,r)=>e(s(...t))));return()=>e}},"(bind)":async(t,e,r)=>{let s=t.prevPlace;return(...t)=>(...e)=>s(...t,...e)},"=":(t,e,r)=>t=>(e[r]=t,t),"+=":(t,e,r)=>t=>e[r]+=t,"-=":(t,e,r)=>t=>e[r]-=t,"/=":(t,e,r)=>t=>e[r]/=t,"*=":(t,e,r)=>t=>e[r]*=t,"+":(t,e,r)=>{let s=t.prevPlace;return t=>s+t},"-":(t,e,r)=>{let s=t.prevPlace;return t=>s-t},"/":(t,e,r)=>{let s=t.prevPlace;return t=>s/t},"*":(t,e,r)=>{let s=t.prevPlace;return t=>s*t},">":(t,e,r)=>{let s=t.prevPlace;return t=>s>t},"<":(t,e,r)=>{let s=t.prevPlace;return t=>s<t},"==":(t,e,r)=>{let s=t.prevPlace;return t=>s===t},"!=":(t,e,r)=>{let s=t.prevPlace;return t=>s!==t},"&":(t,e,r)=>{let s=t.prevPlace;return t=>s&t},"|":(t,e,r)=>{let s=t.prevPlace;return t=>s|t},"..":(t,e,r)=>{let s=t.prevPlace,n=t.global;return(t,e=1)=>n.Range(s,t,e)}};t.exports=new Map(Object.entries(e))},477:t=>{function e(t){return t.replace(/[\/.*+?^${}()|[\]\\\-]/g,"\\$&")}class r{constructor(t,e){this.tokens=e,this.tokenLength=t}toString(){return 1===this.tokenLength?`[${e(this.tokens.join(""))}]`:`(?:${this.tokens.map(e).join("|")})`}}class s{static colorizationRegExp=new RegExp("(?<!\\\\)(?:\\\\)(?:x1b\\[(\\d+)m)","gmi");constructor(...t){this.chars=t.map((t=>"\\\\"+t[0])),this.specials=t.reduce(((t,e)=>(t[e[0]]=e[1],t)),{}),this.findTemplate=`(?:${t.map((t=>"\\\\"+e(t[0]))).join("|")})`,this.replaceRegExp=new RegExp(`(?<!\\\\)(?:\\\\)(${t.map((t=>e(t[0]))).join("|")})`,"gmi")}clean(t){return t.replace(this.replaceRegExp,((t,e)=>this.specials[e])).replace(s.colorizationRegExp,((t,e)=>`[${e}m`))}toString(){return this.findTemplate}}class n{static specialsChars=new s(["n","\n"],["r","\r"],["t","\t"]);constructor(t){this.quote=t}toString(){return`(?:${this.quote})((?:\\\\${this.quote}|${n.specialsChars}|.|\\n)*?)(?:${this.quote})`}}t.exports=class t{static tokenCollections=[new r(2,["+=","-=","/=","*=","~>","==","!=",".."]),new r(1,["$",">","<","!","~","&","|","=","+","-","/","*",",",":","[","]","{","}","(",")","@","."])];static quoteBlocks=[new n('"'),new n("`"),new n("'")];static blockOpenSymbols={"{":"}","[":"]","(":")"};static blockCloseSymbols={"}":"{","]":"{",")":"("};static commentRegExp=new RegExp("(?:#\\*[\\s\\S]*?\\*#)|(?:#.*?$)","gmi");static tokenizerRegExp=new RegExp(t.quoteBlocks.join("|")+"|(?:-|)(?:0x[a-f0-9]+|0o[0-7]+|0b[01]+|\\d+)(?!\\w)"+`|(?:\\d|\\w|\\\\(?:${t.tokenCollections.join("|")}))+|`+t.tokenCollections.join("|"),"gmi");constructor(e,r=null){e&&(e=e.replace(t.commentRegExp,"")),this.tokens=r||[...e.matchAll(t.tokenizerRegExp)].map((t=>n.specialsChars.clean(t.reverse().find((t=>void 0!==t))))),this.position=0,this.tokensCount=this.tokens.length,this.body=[],this.blockParsers={"{":this.parseObjectBlock.bind(this),"[":this.parseArrayBlock.bind(this),"(":this.parseOperatorBlock.bind(this)}}current(){return this.tokens[this.position]}next(){return this.position++,this.current()}push(t){this.body.push(t)}prepareString(t){return t?t.replace(/\\(.)/gim,"$1"):""}buildExpr(e,r){let s={};return(e=e.filter((t=>t)).reduce(((t,e)=>(t[e]=1,t)),{})).$&&(s["@__raw"]=1),e["@"]&&(s["@__follow_ctx"]=1),e.async&&(s["@__async"]=1),e[".."]&&(s["@__unpack_arr_args"]=1),e[">"]?s["@__last"]=this.getArrayTopLevelItems(r).map((e=>new t(null,e).parse())):s["@__expr"]=new t(null,this.getArrayTopLevelItems(r)[0]).parse(),s}getArrayTopLevelItems(e){let r,s=[],n=0,i=0,a=e.length,o=[];for(;i<a;){if(r=e[i],i++,t.blockOpenSymbols[r])n++;else if(t.blockCloseSymbols[r])n--;else if(","===r&&0===n){s.push(o),o=[];continue}o.push(r),i==a&&s.push(o)}return s}parseArrayBlock(t){let e=this.getArrayTopLevelItems(t),r=[];for(let t of e){let e=t.indexOf(":");-1!==e?r.push(this.buildExpr(t.slice(0,e),"["===t[e+1]?t.slice(e+2,t.length-1):t.slice(e+1,t.length))):r.push(this.prepareString(t.join("")))}return r}parseObjectBlock(t){return this.parseArrayBlock(t)[0]}parseOperatorBlock(t){return`(${t.join("")})`}parseBlock(){let e,r=1,s=this.current(),n=t.blockOpenSymbols[s],i=[];for(;this.position<this.tokensCount;){if(e=this.next(),e===s)r++;else if(e===n&&0==--r)break;i.push(e)}this.next(),this.body.push(this.blockParsers[s](i))}parse(){let e;for(;this.position<this.tokensCount;)e=this.current(),t.blockOpenSymbols[e]?(this.parseBlock(),e=this.current()):(this.push(this.prepareString(e)),this.next());return this.body}}},47:(t,e,r)=>{const s=new Map;s.set("@async",r(266)),s.set("@random",r(301)),s.set("@branches",r(712)),t.exports=s},314:(t,e,r)=>{const s=r(586),n=r(47);t.exports=class extends s{constructor(){super()}async import(t,e=!0,r){let s,i,a=new Promise(((t,e)=>(s=t,i=e)));if(e){if(this.__import_cache.has(t))return s(this.__import_cache.get(t)),a;this.__import_cache.set(t,a)}return s(new(n.get(relPath))(this)),a}print(...t){return console.log(...t),t}input(t=""){return prompt(t)}}},164:(t,e,r)=>{const s=r(558),n=r(477),i=r(314);t.exports={Interpreter:s,Parser:n,Global:i}}},e={};function r(s){var n=e[s];if(void 0!==n)return n.exports;var i=e[s]={exports:{}};return t[s](i,i.exports,r),i.exports}return r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r(164)})()}));