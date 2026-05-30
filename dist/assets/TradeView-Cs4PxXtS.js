import{n as K,w as R,q as j,C as nt,o as ot,_ as lt,A as S,p as at,s as I}from"./AppShell.vue_vue_type_script_setup_true_lang-DhLJwdL4.js";import{_ as A}from"./Card.vue_vue_type_script_setup_true_lang-Drh1pLIM.js";import{_ as it}from"./LineChart.vue_vue_type_script_setup_true_lang-CipBRQEj.js";import{c as G,at as q,ar as rt,aG as st,aj as f,a0 as h,E as l,ap as P,af as _,ag as dt,Z as U,av as b,ab as C,ak as V,aq as ut,j as M,ao as X,X as H,a1 as ct,aF as v,a5 as gt,a4 as u,ay as s,a3 as F,an as x,A as L}from"./index--PsOHA0F.js";import{s as z}from"./index-DPKOjOi4.js";import{s as T}from"./index-CWJsD0J-.js";import{s as pt,a as bt,b as ft,c as mt}from"./index-C1f5Khal.js";import"./index-C2pj0GYm.js";import"./index-J5juV234.js";var vt=`
    .p-togglebutton {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        color: dt('togglebutton.color');
        background: dt('togglebutton.background');
        border: 1px solid dt('togglebutton.border.color');
        padding: dt('togglebutton.padding');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
        border-radius: dt('togglebutton.border.radius');
        outline-color: transparent;
        font-weight: dt('togglebutton.font.weight');
    }

    .p-togglebutton-content {
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        gap: dt('togglebutton.gap');
        padding: dt('togglebutton.content.padding');
        background: transparent;
        border-radius: dt('togglebutton.content.border.radius');
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
        background: dt('togglebutton.hover.background');
        color: dt('togglebutton.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked {
        background: dt('togglebutton.checked.background');
        border-color: dt('togglebutton.checked.border.color');
        color: dt('togglebutton.checked.color');
    }

    .p-togglebutton-checked .p-togglebutton-content {
        background: dt('togglebutton.content.checked.background');
        box-shadow: dt('togglebutton.content.checked.shadow');
    }

    .p-togglebutton:focus-visible {
        box-shadow: dt('togglebutton.focus.ring.shadow');
        outline: dt('togglebutton.focus.ring.width') dt('togglebutton.focus.ring.style') dt('togglebutton.focus.ring.color');
        outline-offset: dt('togglebutton.focus.ring.offset');
    }

    .p-togglebutton.p-invalid {
        border-color: dt('togglebutton.invalid.border.color');
    }

    .p-togglebutton:disabled {
        opacity: 1;
        cursor: default;
        background: dt('togglebutton.disabled.background');
        border-color: dt('togglebutton.disabled.border.color');
        color: dt('togglebutton.disabled.color');
    }

    .p-togglebutton-label,
    .p-togglebutton-icon {
        position: relative;
        transition: none;
    }

    .p-togglebutton-icon {
        color: dt('togglebutton.icon.color');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
        color: dt('togglebutton.icon.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
        color: dt('togglebutton.icon.checked.color');
    }

    .p-togglebutton:disabled .p-togglebutton-icon {
        color: dt('togglebutton.icon.disabled.color');
    }

    .p-togglebutton-sm {
        padding: dt('togglebutton.sm.padding');
        font-size: dt('togglebutton.sm.font.size');
    }

    .p-togglebutton-sm .p-togglebutton-content {
        padding: dt('togglebutton.content.sm.padding');
    }

    .p-togglebutton-lg {
        padding: dt('togglebutton.lg.padding');
        font-size: dt('togglebutton.lg.font.size');
    }

    .p-togglebutton-lg .p-togglebutton-content {
        padding: dt('togglebutton.content.lg.padding');
    }

    .p-togglebutton-fluid {
        width: 100%;
    }
`,yt={root:function(e){var n=e.instance,a=e.props;return["p-togglebutton p-component",{"p-togglebutton-checked":n.active,"p-invalid":n.$invalid,"p-togglebutton-fluid":a.fluid,"p-togglebutton-sm p-inputfield-sm":a.size==="small","p-togglebutton-lg p-inputfield-lg":a.size==="large"}]},content:"p-togglebutton-content",icon:"p-togglebutton-icon",label:"p-togglebutton-label"},ht=G.extend({name:"togglebutton",style:vt,classes:yt}),xt={name:"BaseToggleButton",extends:R,props:{onIcon:String,offIcon:String,onLabel:{type:String,default:"Yes"},offLabel:{type:String,default:"No"},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:ht,provide:function(){return{$pcToggleButton:this,$parentInstance:this}}};function k(t){"@babel/helpers - typeof";return k=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(t)}function wt(t,e,n){return(e=_t(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function _t(t){var e=St(t,"string");return k(e)=="symbol"?e:e+""}function St(t,e){if(k(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var a=n.call(t,e);if(k(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var W={name:"ToggleButton",extends:xt,inheritAttrs:!1,emits:["change"],methods:{getPTOptions:function(e){var n=e==="root"?this.ptmi:this.ptm;return n(e,{context:{active:this.active,disabled:this.disabled}})},onChange:function(e){!this.disabled&&!this.readonly&&(this.writeValue(!this.d_value,e),this.$emit("change",e))},onBlur:function(e){var n,a;(n=(a=this.formField).onBlur)===null||n===void 0||n.call(a,e)}},computed:{active:function(){return this.d_value===!0},hasLabel:function(){return q(this.onLabel)&&q(this.offLabel)},label:function(){return this.hasLabel?this.d_value?this.onLabel:this.offLabel:" "},dataP:function(){return j(wt({checked:this.active,invalid:this.$invalid},this.size,this.size))}},directives:{ripple:K}},kt=["tabindex","disabled","aria-pressed","aria-label","aria-labelledby","data-p-checked","data-p-disabled","data-p"],Vt=["data-p"];function Lt(t,e,n,a,g,o){var d=rt("ripple");return st((f(),h("button",_({type:"button",class:t.cx("root"),tabindex:t.tabindex,disabled:t.disabled,"aria-pressed":t.d_value,onClick:e[0]||(e[0]=function(){return o.onChange&&o.onChange.apply(o,arguments)}),onBlur:e[1]||(e[1]=function(){return o.onBlur&&o.onBlur.apply(o,arguments)})},o.getPTOptions("root"),{"aria-label":t.ariaLabel,"aria-labelledby":t.ariaLabelledby,"data-p-checked":o.active,"data-p-disabled":t.disabled,"data-p":o.dataP}),[l("span",_({class:t.cx("content")},o.getPTOptions("content"),{"data-p":o.dataP}),[P(t.$slots,"default",{},function(){return[P(t.$slots,"icon",{value:t.d_value,class:dt(t.cx("icon"))},function(){return[t.onIcon||t.offIcon?(f(),h("span",_({key:0,class:[t.cx("icon"),t.d_value?t.onIcon:t.offIcon]},o.getPTOptions("icon")),null,16)):U("",!0)]}),l("span",_({class:t.cx("label")},o.getPTOptions("label")),b(o.label),17)]})],16,Vt)],16,kt)),[[d]])}W.render=Lt;var Bt=`
    .p-selectbutton {
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        outline-color: transparent;
        border-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton {
        border-radius: 0;
        border-width: 1px 1px 1px 0;
    }

    .p-selectbutton .p-togglebutton:focus-visible {
        position: relative;
        z-index: 1;
    }

    .p-selectbutton .p-togglebutton:first-child {
        border-inline-start-width: 1px;
        border-start-start-radius: dt('selectbutton.border.radius');
        border-end-start-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton:last-child {
        border-start-end-radius: dt('selectbutton.border.radius');
        border-end-end-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton.p-invalid {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }

    .p-selectbutton-fluid {
        width: 100%;
    }
    
    .p-selectbutton-fluid .p-togglebutton {
        flex: 1 1 0;
    }
`,Ot={root:function(e){var n=e.props,a=e.instance;return["p-selectbutton p-component",{"p-invalid":a.$invalid,"p-selectbutton-fluid":n.fluid}]}},At=G.extend({name:"selectbutton",style:Bt,classes:Ot}),Ct={name:"BaseSelectButton",extends:R,props:{options:Array,optionLabel:null,optionValue:null,optionDisabled:null,multiple:Boolean,allowEmpty:{type:Boolean,default:!0},dataKey:null,ariaLabelledby:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:At,provide:function(){return{$pcSelectButton:this,$parentInstance:this}}};function Tt(t,e){var n=typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=Z(t))||e){n&&(t=n);var a=0,g=function(){};return{s:g,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(m){throw m},f:g}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o,d=!0,r=!1;return{s:function(){n=n.call(t)},n:function(){var m=n.next();return d=m.done,m},e:function(m){r=!0,o=m},f:function(){try{d||n.return==null||n.return()}finally{if(r)throw o}}}}function Pt(t){return Et(t)||Nt(t)||Z(t)||$t()}function $t(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Z(t,e){if(t){if(typeof t=="string")return $(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?$(t,e):void 0}}function Nt(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Et(t){if(Array.isArray(t))return $(t)}function $(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=Array(e);n<e;n++)a[n]=t[n];return a}var N={name:"SelectButton",extends:Ct,inheritAttrs:!1,emits:["change"],methods:{getOptionLabel:function(e){return this.optionLabel?V(e,this.optionLabel):e},getOptionValue:function(e){return this.optionValue?V(e,this.optionValue):e},getOptionRenderKey:function(e){return this.dataKey?V(e,this.dataKey):this.getOptionLabel(e)},isOptionDisabled:function(e){return this.optionDisabled?V(e,this.optionDisabled):!1},isOptionReadonly:function(e){if(this.allowEmpty)return!1;var n=this.isSelected(e);return this.multiple?n&&this.d_value.length===1:n},onOptionSelect:function(e,n,a){var g=this;if(!(this.disabled||this.isOptionDisabled(n)||this.isOptionReadonly(n))){var o=this.isSelected(n),d=this.getOptionValue(n),r;if(this.multiple)if(o){if(r=this.d_value.filter(function(p){return!C(p,d,g.equalityKey)}),!this.allowEmpty&&r.length===0)return}else r=this.d_value?[].concat(Pt(this.d_value),[d]):[d];else{if(o&&!this.allowEmpty)return;r=o?null:d}this.writeValue(r,e),this.$emit("change",{originalEvent:e,value:r})}},isSelected:function(e){var n=!1,a=this.getOptionValue(e);if(this.multiple){if(this.d_value){var g=Tt(this.d_value),o;try{for(g.s();!(o=g.n()).done;){var d=o.value;if(C(d,a,this.equalityKey)){n=!0;break}}}catch(r){g.e(r)}finally{g.f()}}}else n=C(this.d_value,a,this.equalityKey);return n}},computed:{equalityKey:function(){return this.optionValue?null:this.dataKey},dataP:function(){return j({invalid:this.$invalid})}},directives:{ripple:K},components:{ToggleButton:W}},Dt=["aria-labelledby","data-p"];function It(t,e,n,a,g,o){var d=ut("ToggleButton");return f(),h("div",_({class:t.cx("root"),role:"group","aria-labelledby":t.ariaLabelledby},t.ptmi("root"),{"data-p":o.dataP}),[(f(!0),h(M,null,X(t.options,function(r,p){return f(),H(d,{key:o.getOptionRenderKey(r),modelValue:o.isSelected(r),onLabel:o.getOptionLabel(r),offLabel:o.getOptionLabel(r),disabled:t.disabled||o.isOptionDisabled(r),unstyled:t.unstyled,size:t.size,readonly:o.isOptionReadonly(r),onChange:function(w){return o.onOptionSelect(w,r,p)},pt:t.ptm("pcToggleButton")},ct({_:2},[t.$slots.option?{name:"default",fn:v(function(){return[P(t.$slots,"option",{option:r,index:p},function(){return[l("span",_({ref_for:!0},t.ptm("pcToggleButton").label),b(o.getOptionLabel(r)),17)]})]}),key:"0"}:void 0]),1032,["modelValue","onLabel","offLabel","disabled","unstyled","size","readonly","onChange","pt"])}),128))],16,Dt)}N.render=It;const qt={class:"mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:gap-7 lg:grid-cols-[1fr_400px]"},Ft={class:"order-2 space-y-5 sm:space-y-7 lg:order-1"},zt={class:"flex items-center justify-between gap-3"},Kt={class:"flex items-center gap-3"},Rt={class:"grid h-10 w-10 place-items-center rounded-full bg-obsidian-700 text-lg"},jt={class:"leading-tight"},Gt={class:"font-display text-base font-bold text-ivory"},Ut={class:"text-[11px] text-platinum-400"},Mt={class:"text-right leading-tight"},Xt={class:"nums text-xl font-bold text-ivory"},Ht={class:"text-sm text-platinum-300"},Wt={class:"order-1 lg:order-2"},Zt={class:"lg:sticky lg:top-4"},Qt={key:0,class:"mt-5 space-y-3"},Yt={class:"rounded-xl border border-obsidian-500/70 bg-obsidian-900 p-3"},Jt={class:"flex gap-2"},te={class:"flex justify-center"},ee={class:"rounded-xl border border-obsidian-500/70 bg-obsidian-900 p-3"},ne={class:"flex items-center gap-2"},oe={class:"flex-1 text-right nums text-lg font-semibold text-ivory"},le={class:"flex items-center justify-center gap-2 text-[11px] text-platinum-400"},ae={key:1,class:"mt-5 space-y-4"},ie={key:0},re={class:"flex items-center justify-between rounded-lg bg-obsidian-900 px-3 py-3"},se={class:"text-sm text-platinum-300"},de={class:"nums text-base font-semibold text-ivory"},he=gt({__name:"TradeView",setup(t){const e={KES:1,NGN:.1524,ZAR:6.95,GHS:8.6,EGP:2.6},n=["Buy","Sell","FX","Convert"],a=x("Buy"),g=L(()=>a.value==="FX"||a.value==="Convert"),o=x("NGN"),d=x("KES"),r=x(1e6),p=L(()=>(e[o.value]??1)/(e[d.value]??1)),m=L(()=>(r.value||0)*p.value),w=x("Market"),B=x(100),O=x(682.5),Q=L(()=>(B.value||0)*(w.value==="Market"?682.5:O.value||0)),Y=nt.map(y=>y.close),E=ot.map(y=>y.code),D=y=>y.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),J=[{q:"Direct African conversion",a:"Convert NGN → KES directly without routing through the US Dollar, removing a layer of cost and delay."},{q:"Faster settlement",a:"Fewer intermediaries means trades clear faster and you lose less to the spread on every conversion."},{q:"Improved regional liquidity",a:"African-denominated order flow deepens local liquidity, tightening prices across connected markets."},{q:"Lower cross-border costs",a:"Reduced FX friction lowers the cost of doing business across the continent."}];function tt(){const y=o.value;o.value=d.value,d.value=y}return(y,i)=>(f(),H(lt,{title:"Trade"},{default:v(()=>[l("div",qt,[l("div",Ft,[u(A,null,{default:v(()=>[l("div",zt,[l("div",Kt,[l("span",Rt,b(s(S).flag),1),l("div",jt,[l("div",Gt,b(s(S).pair),1),l("div",Ut,b(s(S).name),1)])]),l("div",Mt,[l("div",Xt,b(s(S).price.toFixed(4)),1),u(at,{value:s(S).change,percent:"",class:"text-xs"},null,8,["value"])])]),u(it,{data:s(Y),height:160,tone:"up",class:"mt-4"},null,8,["data"])]),_:1}),u(A,{title:"Why African pairs?"},{default:v(()=>[u(s(pt),{value:"0"},{default:v(()=>[(f(),h(M,null,X(J,(c,et)=>u(s(bt),{key:c.q,value:String(et)},{default:v(()=>[u(s(ft),null,{default:v(()=>[F(b(c.q),1)]),_:2},1024),u(s(mt),null,{default:v(()=>[l("p",Ht,b(c.a),1)]),_:2},1024)]),_:2},1032,["value"])),64))]),_:1})]),_:1})]),l("div",Wt,[l("div",Zt,[u(A,null,{default:v(()=>[u(s(N),{modelValue:a.value,"onUpdate:modelValue":i[0]||(i[0]=c=>a.value=c),options:n,allowEmpty:!1,class:"w-full"},null,8,["modelValue"]),g.value?(f(),h("div",Qt,[l("div",Yt,[i[7]||(i[7]=l("div",{class:"mb-1.5 text-xs font-medium uppercase tracking-wider text-platinum-400"},"From",-1)),l("div",Jt,[u(s(z),{modelValue:o.value,"onUpdate:modelValue":i[1]||(i[1]=c=>o.value=c),options:s(E),class:"w-28"},null,8,["modelValue","options"]),u(s(T),{modelValue:r.value,"onUpdate:modelValue":i[2]||(i[2]=c=>r.value=c),class:"flex-1",inputClass:"text-right nums",minFractionDigits:0},null,8,["modelValue"])])]),l("div",te,[u(s(I),{icon:"pi pi-arrow-right-arrow-left",rounded:"",text:"",severity:"secondary",class:"rotate-90",onClick:tt})]),l("div",ee,[i[8]||(i[8]=l("div",{class:"mb-1.5 text-xs font-medium uppercase tracking-wider text-platinum-400"},"To (estimated)",-1)),l("div",ne,[u(s(z),{modelValue:d.value,"onUpdate:modelValue":i[3]||(i[3]=c=>d.value=c),options:s(E),class:"w-28"},null,8,["modelValue","options"]),l("div",oe,b(D(m.value)),1)])]),l("div",le,[i[9]||(i[9]=l("span",{class:"h-1.5 w-1.5 rounded-full bg-emerald-400"},null,-1)),F(" 1 "+b(o.value)+" = "+b(p.value.toFixed(4))+" "+b(d.value)+" · No USD routing ",1)])])):(f(),h("div",ae,[i[12]||(i[12]=l("div",null,[l("div",{class:"mb-1.5 text-xs font-medium uppercase tracking-wider text-platinum-400"},"Instrument"),l("div",{class:"flex h-12 items-center gap-3 rounded-lg border border-obsidian-500/70 bg-obsidian-900 px-3"},[l("span",{class:"grid h-7 w-7 place-items-center rounded-md bg-emerald-500/20 text-[10px] font-bold text-emerald-300"},"DA"),l("div",{class:"leading-tight"},[l("div",{class:"text-sm font-semibold text-ivory"},"DANGCEM"),l("div",{class:"text-[11px] text-platinum-400"},"Dangote Cement · NGX")]),l("span",{class:"ml-auto nums text-sm text-ivory"},"NGN 682.50")])],-1)),u(s(N),{modelValue:w.value,"onUpdate:modelValue":i[4]||(i[4]=c=>w.value=c),options:["Market","Limit"],allowEmpty:!1,class:"w-full"},null,8,["modelValue"]),l("div",null,[i[10]||(i[10]=l("div",{class:"mb-1.5 text-xs font-medium uppercase tracking-wider text-platinum-400"},"Quantity",-1)),u(s(T),{modelValue:B.value,"onUpdate:modelValue":i[5]||(i[5]=c=>B.value=c),class:"w-full",inputClass:"text-right nums"},null,8,["modelValue"])]),w.value==="Limit"?(f(),h("div",ie,[i[11]||(i[11]=l("div",{class:"mb-1.5 text-xs font-medium uppercase tracking-wider text-platinum-400"},"Limit Price (NGN)",-1)),u(s(T),{modelValue:O.value,"onUpdate:modelValue":i[6]||(i[6]=c=>O.value=c),class:"w-full",inputClass:"text-right nums",minFractionDigits:2},null,8,["modelValue"])])):U("",!0),l("div",re,[l("span",se,"Estimated "+b(a.value==="Buy"?"Cost":"Proceeds"),1),l("span",de,"NGN "+b(D(Q.value)),1)])])),u(s(I),{label:g.value?"Review Conversion":`Review ${a.value} Order`,severity:a.value==="Sell"?"danger":"primary",class:"mt-5 w-full font-display font-semibold",size:"large"},null,8,["label","severity"]),i[13]||(i[13]=l("p",{class:"mt-2 text-center text-[11px] text-platinum-400"},"Settled in African value · Pan-African Liquidity Network",-1))]),_:1})])])])]),_:1}))}});export{he as default};
