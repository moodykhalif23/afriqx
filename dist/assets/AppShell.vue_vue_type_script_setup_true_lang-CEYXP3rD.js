import{az as Zt,ae as mt,af as f,u as ut,d as Wt,at as Z,a8 as V,F as Qt,N as z,a as K,n as R,c as S,y as Jt,aK as ft,z as Yt,ad as kt,aj as u,a0 as b,E as c,ap as P,a3 as I,av as $,Q as te,P as ct,p as wt,R as Pt,aC as at,C as ee,K as ne,W as oe,U as ie,b as re,aq as G,ar as $t,aG as q,X as T,aF as O,Z as k,ag as E,as as ht,a5 as F,ai as j,aA as Nt,a4 as v,j as C,ao as D,ay as x,a2 as Ft,au as ae,ax as se,T as le,s as de,e as ue,D as ce,aJ as pt,S as pe,x as ot,Y as it,o as be,an as Mt,aB as me,A as At}from"./index-BRBmhgsR.js";function L(...e){if(e){let t=[];for(let n=0;n<e.length;n++){let o=e[n];if(!o)continue;let r=typeof o;if(r==="string"||r==="number")t.push(o);else if(r==="object"){let i=Array.isArray(o)?[L(...o)]:Object.entries(o).map(([d,s])=>s?d:void 0);t=i.length?t.concat(i.filter(d=>!!d)):t}}return t.join(" ").trim()}}function fe(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"pc",t=Zt();return"".concat(e).concat(t.replace("v-","").replaceAll("-","_"))}var It=S.extend({name:"common"});function W(e){"@babel/helpers - typeof";return W=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},W(e)}function he(e){return Rt(e)||ge(e)||zt(e)||Bt()}function ge(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function U(e,t){return Rt(e)||ve(e,t)||zt(e,t)||Bt()}function Bt(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function zt(e,t){if(e){if(typeof e=="string")return gt(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?gt(e,t):void 0}}function gt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function ve(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var o,r,i,d,s=[],a=!0,l=!1;try{if(i=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;a=!1}else for(;!(a=(o=i.call(n)).done)&&(s.push(o.value),s.length!==t);a=!0);}catch(p){l=!0,r=p}finally{try{if(!a&&n.return!=null&&(d=n.return(),Object(d)!==d))return}finally{if(l)throw r}}return s}}function Rt(e){if(Array.isArray(e))return e}function _t(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,o)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?_t(Object(n),!0).forEach(function(o){H(e,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_t(Object(n)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(n,o))})}return e}function H(e,t,n){return(t=ye(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ye(e){var t=xe(e,"string");return W(t)=="symbol"?t:t+""}function xe(e,t){if(W(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var o=n.call(e,t);if(W(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var N={name:"BaseComponent",props:{pt:{type:Object,default:void 0},ptOptions:{type:Object,default:void 0},unstyled:{type:Boolean,default:void 0},dt:{type:Object,default:void 0}},inject:{$parentInstance:{default:void 0}},watch:{isUnstyled:{immediate:!0,handler:function(t){z.off("theme:change",this._loadCoreStyles),t||(this._loadCoreStyles(),this._themeChangeListener(this._loadCoreStyles))}},dt:{immediate:!0,handler:function(t,n){var o=this;z.off("theme:change",this._themeScopedListener),t?(this._loadScopedThemeStyles(t),this._themeScopedListener=function(){return o._loadScopedThemeStyles(t)},this._themeChangeListener(this._themeScopedListener)):this._unloadScopedThemeStyles()}}},scopedStyleEl:void 0,rootEl:void 0,uid:void 0,$attrSelector:void 0,beforeCreate:function(){var t,n,o,r,i,d,s,a,l,p,h,g=(t=this.pt)===null||t===void 0?void 0:t._usept,y=g?(n=this.pt)===null||n===void 0||(n=n.originalValue)===null||n===void 0?void 0:n[this.$.type.name]:void 0,A=g?(o=this.pt)===null||o===void 0||(o=o.value)===null||o===void 0?void 0:o[this.$.type.name]:this.pt;(r=A||y)===null||r===void 0||(r=r.hooks)===null||r===void 0||(i=r.onBeforeCreate)===null||i===void 0||i.call(r);var M=(d=this.$primevueConfig)===null||d===void 0||(d=d.pt)===null||d===void 0?void 0:d._usept,lt=M?(s=this.$primevue)===null||s===void 0||(s=s.config)===null||s===void 0||(s=s.pt)===null||s===void 0?void 0:s.originalValue:void 0,B=M?(a=this.$primevue)===null||a===void 0||(a=a.config)===null||a===void 0||(a=a.pt)===null||a===void 0?void 0:a.value:(l=this.$primevue)===null||l===void 0||(l=l.config)===null||l===void 0?void 0:l.pt;(p=B||lt)===null||p===void 0||(p=p[this.$.type.name])===null||p===void 0||(p=p.hooks)===null||p===void 0||(h=p.onBeforeCreate)===null||h===void 0||h.call(p),this.$attrSelector=fe(),this.uid=this.$attrs.id||this.$attrSelector.replace("pc","pv_id_")},created:function(){this._hook("onCreated")},beforeMount:function(){var t;this.rootEl=ft(Yt(this.$el)?this.$el:(t=this.$el)===null||t===void 0?void 0:t.parentElement,"[".concat(this.$attrSelector,"]")),this.rootEl&&(this.rootEl.$pc=m({name:this.$.type.name,attrSelector:this.$attrSelector},this.$params)),this._loadStyles(),this._hook("onBeforeMount")},mounted:function(){this._hook("onMounted")},beforeUpdate:function(){this._hook("onBeforeUpdate")},updated:function(){this._hook("onUpdated")},beforeUnmount:function(){this._hook("onBeforeUnmount")},unmounted:function(){this._removeThemeListeners(),this._unloadScopedThemeStyles(),this._hook("onUnmounted")},methods:{_hook:function(t){if(!this.$options.hostName){var n=this._usePT(this._getPT(this.pt,this.$.type.name),this._getOptionValue,"hooks.".concat(t)),o=this._useDefaultPT(this._getOptionValue,"hooks.".concat(t));n==null||n(),o==null||o()}},_mergeProps:function(t){for(var n=arguments.length,o=new Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];return Jt(t)?t.apply(void 0,o):f.apply(void 0,o)},_load:function(){K.isStyleNameLoaded("base")||(S.loadCSS(this.$styleOptions),this._loadGlobalStyles(),K.setLoadedStyleName("base")),this._loadThemeStyles()},_loadStyles:function(){this._load(),this._themeChangeListener(this._load)},_loadCoreStyles:function(){var t,n;!K.isStyleNameLoaded((t=this.$style)===null||t===void 0?void 0:t.name)&&(n=this.$style)!==null&&n!==void 0&&n.name&&(It.loadCSS(this.$styleOptions),this.$options.style&&this.$style.loadCSS(this.$styleOptions),K.setLoadedStyleName(this.$style.name))},_loadGlobalStyles:function(){var t=this._useGlobalPT(this._getOptionValue,"global.css",this.$params);Z(t)&&S.load(t,m({name:"global"},this.$styleOptions))},_loadThemeStyles:function(){var t,n;if(!(this.isUnstyled||this.$theme==="none")){if(!R.isStyleNameLoaded("common")){var o,r,i=((o=this.$style)===null||o===void 0||(r=o.getCommonTheme)===null||r===void 0?void 0:r.call(o))||{},d=i.primitive,s=i.semantic,a=i.global,l=i.style;S.load(d==null?void 0:d.css,m({name:"primitive-variables"},this.$styleOptions)),S.load(s==null?void 0:s.css,m({name:"semantic-variables"},this.$styleOptions)),S.load(a==null?void 0:a.css,m({name:"global-variables"},this.$styleOptions)),S.loadStyle(m({name:"global-style"},this.$styleOptions),l),R.setLoadedStyleName("common")}if(!R.isStyleNameLoaded((t=this.$style)===null||t===void 0?void 0:t.name)&&(n=this.$style)!==null&&n!==void 0&&n.name){var p,h,g,y,A=((p=this.$style)===null||p===void 0||(h=p.getComponentTheme)===null||h===void 0?void 0:h.call(p))||{},M=A.css,lt=A.style;(g=this.$style)===null||g===void 0||g.load(M,m({name:"".concat(this.$style.name,"-variables")},this.$styleOptions)),(y=this.$style)===null||y===void 0||y.loadStyle(m({name:"".concat(this.$style.name,"-style")},this.$styleOptions),lt),R.setLoadedStyleName(this.$style.name)}if(!R.isStyleNameLoaded("layer-order")){var B,dt,Xt=(B=this.$style)===null||B===void 0||(dt=B.getLayerOrderThemeCSS)===null||dt===void 0?void 0:dt.call(B);S.load(Xt,m({name:"layer-order",first:!0},this.$styleOptions)),R.setLoadedStyleName("layer-order")}}},_loadScopedThemeStyles:function(t){var n,o,r,i=((n=this.$style)===null||n===void 0||(o=n.getPresetTheme)===null||o===void 0?void 0:o.call(n,t,"[".concat(this.$attrSelector,"]")))||{},d=i.css,s=(r=this.$style)===null||r===void 0?void 0:r.load(d,m({name:"".concat(this.$attrSelector,"-").concat(this.$style.name)},this.$styleOptions));this.scopedStyleEl=s.el},_unloadScopedThemeStyles:function(){var t;(t=this.scopedStyleEl)===null||t===void 0||(t=t.value)===null||t===void 0||t.remove()},_themeChangeListener:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(){};K.clearLoadedStyleNames(),z.on("theme:change",t)},_removeThemeListeners:function(){z.off("theme:change",this._loadCoreStyles),z.off("theme:change",this._load),z.off("theme:change",this._themeScopedListener)},_getHostInstance:function(t){return t?this.$options.hostName?t.$.type.name===this.$options.hostName?t:this._getHostInstance(t.$parentInstance):t.$parentInstance:void 0},_getPropValue:function(t){var n;return this[t]||((n=this._getHostInstance(this))===null||n===void 0?void 0:n[t])},_getOptionValue:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return Qt(t,n,o)},_getPTValue:function(){var t,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,d=/./g.test(o)&&!!r[o.split(".")[0]],s=this._getPropValue("ptOptions")||((t=this.$primevueConfig)===null||t===void 0?void 0:t.ptOptions)||{},a=s.mergeSections,l=a===void 0?!0:a,p=s.mergeProps,h=p===void 0?!1:p,g=i?d?this._useGlobalPT(this._getPTClassValue,o,r):this._useDefaultPT(this._getPTClassValue,o,r):void 0,y=d?void 0:this._getPTSelf(n,this._getPTClassValue,o,m(m({},r),{},{global:g||{}})),A=this._getPTDatasets(o);return l||!l&&y?h?this._mergeProps(h,g,y,A):m(m(m({},g),y),A):m(m({},y),A)},_getPTSelf:function(){for(var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length,o=new Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];return f(this._usePT.apply(this,[this._getPT(t,this.$name)].concat(o)),this._usePT.apply(this,[this.$_attrsPT].concat(o)))},_getPTDatasets:function(){var t,n,o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",r="data-pc-",i=o==="root"&&Z((t=this.pt)===null||t===void 0?void 0:t["data-pc-section"]);return o!=="transition"&&m(m({},o==="root"&&m(m(H({},"".concat(r,"name"),V(i?(n=this.pt)===null||n===void 0?void 0:n["data-pc-section"]:this.$.type.name)),i&&H({},"".concat(r,"extend"),V(this.$.type.name))),{},H({},"".concat(this.$attrSelector),""))),{},H({},"".concat(r,"section"),V(o)))},_getPTClassValue:function(){var t=this._getOptionValue.apply(this,arguments);return ut(t)||Wt(t)?{class:t}:t},_getPT:function(t){var n=this,o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",r=arguments.length>2?arguments[2]:void 0,i=function(s){var a,l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,p=r?r(s):s,h=V(o),g=V(n.$name);return(a=l?h!==g?p==null?void 0:p[h]:void 0:p==null?void 0:p[h])!==null&&a!==void 0?a:p};return t!=null&&t.hasOwnProperty("_usept")?{_usept:t._usept,originalValue:i(t.originalValue),value:i(t.value)}:i(t,!0)},_usePT:function(t,n,o,r){var i=function(M){return n(M,o,r)};if(t!=null&&t.hasOwnProperty("_usept")){var d,s=t._usept||((d=this.$primevueConfig)===null||d===void 0?void 0:d.ptOptions)||{},a=s.mergeSections,l=a===void 0?!0:a,p=s.mergeProps,h=p===void 0?!1:p,g=i(t.originalValue),y=i(t.value);return g===void 0&&y===void 0?void 0:ut(y)?y:ut(g)?g:l||!l&&y?h?this._mergeProps(h,g,y):m(m({},g),y):y}return i(t)},_useGlobalPT:function(t,n,o){return this._usePT(this.globalPT,t,n,o)},_useDefaultPT:function(t,n,o){return this._usePT(this.defaultPT,t,n,o)},ptm:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this._getPTValue(this.pt,t,m(m({},this.$params),n))},ptmi:function(){var t,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=f(this.$_attrsWithoutPT,this.ptm(n,o));return r!=null&&r.hasOwnProperty("id")&&((t=r.id)!==null&&t!==void 0||(r.id=this.$id)),r},ptmo:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this._getPTValue(t,n,m({instance:this},o),!1)},cx:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.isUnstyled?void 0:this._getOptionValue(this.$style.classes,t,m(m({},this.$params),n))},sx:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(n){var r=this._getOptionValue(this.$style.inlineStyles,t,m(m({},this.$params),o)),i=this._getOptionValue(It.inlineStyles,t,m(m({},this.$params),o));return[i,r]}}},computed:{globalPT:function(){var t,n=this;return this._getPT((t=this.$primevueConfig)===null||t===void 0?void 0:t.pt,void 0,function(o){return mt(o,{instance:n})})},defaultPT:function(){var t,n=this;return this._getPT((t=this.$primevueConfig)===null||t===void 0?void 0:t.pt,void 0,function(o){return n._getOptionValue(o,n.$name,m({},n.$params))||mt(o,m({},n.$params))})},isUnstyled:function(){var t;return this.unstyled!==void 0?this.unstyled:(t=this.$primevueConfig)===null||t===void 0?void 0:t.unstyled},$id:function(){return this.$attrs.id||this.uid},$inProps:function(){var t,n=Object.keys(((t=this.$.vnode)===null||t===void 0?void 0:t.props)||{});return Object.fromEntries(Object.entries(this.$props).filter(function(o){var r=U(o,1),i=r[0];return n==null?void 0:n.includes(i)}))},$theme:function(){var t;return(t=this.$primevueConfig)===null||t===void 0?void 0:t.theme},$style:function(){return m(m({classes:void 0,inlineStyles:void 0,load:function(){},loadCSS:function(){},loadStyle:function(){}},(this._getHostInstance(this)||{}).$style),this.$options.style)},$styleOptions:function(){var t;return{nonce:(t=this.$primevueConfig)===null||t===void 0||(t=t.csp)===null||t===void 0?void 0:t.nonce}},$primevueConfig:function(){var t;return(t=this.$primevue)===null||t===void 0?void 0:t.config},$name:function(){return this.$options.hostName||this.$.type.name},$params:function(){var t=this._getHostInstance(this)||this.$parent;return{instance:this,props:this.$props,state:this.$data,attrs:this.$attrs,parent:{instance:t,props:t==null?void 0:t.$props,state:t==null?void 0:t.$data,attrs:t==null?void 0:t.$attrs}}},$_attrsPT:function(){return Object.entries(this.$attrs||{}).filter(function(t){var n=U(t,1),o=n[0];return o==null?void 0:o.startsWith("pt:")}).reduce(function(t,n){var o=U(n,2),r=o[0],i=o[1],d=r.split(":"),s=he(d),a=gt(s).slice(1);return a==null||a.reduce(function(l,p,h,g){return!l[p]&&(l[p]=h===g.length-1?i:{}),l[p]},t),t},{})},$_attrsWithoutPT:function(){return Object.entries(this.$attrs||{}).filter(function(t){var n=U(t,1),o=n[0];return!(o!=null&&o.startsWith("pt:"))}).reduce(function(t,n){var o=U(n,2),r=o[0],i=o[1];return t[r]=i,t},{})}}},ke=`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
    flex-shrink: 0;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,$e=S.extend({name:"baseicon",css:ke});function Q(e){"@babel/helpers - typeof";return Q=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Q(e)}function Ct(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,o)}return n}function Et(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Ct(Object(n),!0).forEach(function(o){Se(e,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ct(Object(n)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(n,o))})}return e}function Se(e,t,n){return(t=we(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function we(e){var t=Pe(e,"string");return Q(t)=="symbol"?t:t+""}function Pe(e,t){if(Q(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var o=n.call(e,t);if(Q(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Ae={name:"BaseIcon",extends:N,props:{label:{type:String,default:void 0},spin:{type:Boolean,default:!1}},style:$e,provide:function(){return{$pcIcon:this,$parentInstance:this}},methods:{pti:function(){var t=kt(this.label);return Et(Et({},!this.isUnstyled&&{class:["p-icon",{"p-icon-spin":this.spin}]}),{},{role:t?void 0:"img","aria-label":t?void 0:this.label,"aria-hidden":t})}}},jt={name:"SpinnerIcon",extends:Ae};function Ie(e){return Te(e)||Ee(e)||Ce(e)||_e()}function _e(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ce(e,t){if(e){if(typeof e=="string")return vt(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?vt(e,t):void 0}}function Ee(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Te(e){if(Array.isArray(e))return vt(e)}function vt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function Oe(e,t,n,o,r,i){return u(),b("svg",f({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),Ie(t[0]||(t[0]=[c("path",{d:"M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z",fill:"currentColor"},null,-1)])),16)}jt.render=Oe;var Le=`
    .p-badge {
        display: inline-flex;
        border-radius: dt('badge.border.radius');
        align-items: center;
        justify-content: center;
        padding: dt('badge.padding');
        background: dt('badge.primary.background');
        color: dt('badge.primary.color');
        font-size: dt('badge.font.size');
        font-weight: dt('badge.font.weight');
        min-width: dt('badge.min.width');
        height: dt('badge.height');
    }

    .p-badge-dot {
        width: dt('badge.dot.size');
        min-width: dt('badge.dot.size');
        height: dt('badge.dot.size');
        border-radius: 50%;
        padding: 0;
    }

    .p-badge-circle {
        padding: 0;
        border-radius: 50%;
    }

    .p-badge-secondary {
        background: dt('badge.secondary.background');
        color: dt('badge.secondary.color');
    }

    .p-badge-success {
        background: dt('badge.success.background');
        color: dt('badge.success.color');
    }

    .p-badge-info {
        background: dt('badge.info.background');
        color: dt('badge.info.color');
    }

    .p-badge-warn {
        background: dt('badge.warn.background');
        color: dt('badge.warn.color');
    }

    .p-badge-danger {
        background: dt('badge.danger.background');
        color: dt('badge.danger.color');
    }

    .p-badge-contrast {
        background: dt('badge.contrast.background');
        color: dt('badge.contrast.color');
    }

    .p-badge-sm {
        font-size: dt('badge.sm.font.size');
        min-width: dt('badge.sm.min.width');
        height: dt('badge.sm.height');
    }

    .p-badge-lg {
        font-size: dt('badge.lg.font.size');
        min-width: dt('badge.lg.min.width');
        height: dt('badge.lg.height');
    }

    .p-badge-xl {
        font-size: dt('badge.xl.font.size');
        min-width: dt('badge.xl.min.width');
        height: dt('badge.xl.height');
    }
`,Ne={root:function(t){var n=t.props,o=t.instance;return["p-badge p-component",{"p-badge-circle":Z(n.value)&&String(n.value).length===1,"p-badge-dot":kt(n.value)&&!o.$slots.default,"p-badge-sm":n.size==="small","p-badge-lg":n.size==="large","p-badge-xl":n.size==="xlarge","p-badge-info":n.severity==="info","p-badge-success":n.severity==="success","p-badge-warn":n.severity==="warn","p-badge-danger":n.severity==="danger","p-badge-secondary":n.severity==="secondary","p-badge-contrast":n.severity==="contrast"}]}},Fe=S.extend({name:"badge",style:Le,classes:Ne}),Me={name:"BaseBadge",extends:N,props:{value:{type:[String,Number],default:null},severity:{type:String,default:null},size:{type:String,default:null}},style:Fe,provide:function(){return{$pcBadge:this,$parentInstance:this}}};function J(e){"@babel/helpers - typeof";return J=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},J(e)}function Tt(e,t,n){return(t=Be(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Be(e){var t=ze(e,"string");return J(t)=="symbol"?t:t+""}function ze(e,t){if(J(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var o=n.call(e,t);if(J(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Gt={name:"Badge",extends:Me,inheritAttrs:!1,computed:{dataP:function(){return L(Tt(Tt({circle:this.value!=null&&String(this.value).length===1,empty:this.value==null&&!this.$slots.default},this.severity,this.severity),this.size,this.size))}}},Re=["data-p"];function je(e,t,n,o,r,i){return u(),b("span",f({class:e.cx("root"),"data-p":i.dataP},e.ptmi("root")),[P(e.$slots,"default",{},function(){return[I($(e.value),1)]})],16,Re)}Gt.render=je;var Ge=`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,De={root:"p-ink"},Ve=S.extend({name:"ripple-directive",style:Ge,classes:De}),Ke=re.extend({style:Ve});function Y(e){"@babel/helpers - typeof";return Y=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Y(e)}function Ue(e){return Ze(e)||Xe(e)||qe(e)||He()}function He(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function qe(e,t){if(e){if(typeof e=="string")return yt(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?yt(e,t):void 0}}function Xe(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Ze(e){if(Array.isArray(e))return yt(e)}function yt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function Ot(e,t,n){return(t=We(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function We(e){var t=Qe(e,"string");return Y(t)=="symbol"?t:t+""}function Qe(e,t){if(Y(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var o=n.call(e,t);if(Y(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Dt=Ke.extend("ripple",{watch:{"config.ripple":function(t){t?(this.createRipple(this.$host),this.bindEvents(this.$host),this.$host.setAttribute("data-pd-ripple",!0),this.$host.style.overflow="hidden",this.$host.style.position="relative"):(this.remove(this.$host),this.$host.removeAttribute("data-pd-ripple"))}},unmounted:function(t){this.remove(t)},timeout:void 0,methods:{bindEvents:function(t){t.addEventListener("mousedown",this.onMouseDown.bind(this))},unbindEvents:function(t){t.removeEventListener("mousedown",this.onMouseDown.bind(this))},createRipple:function(t){var n=this.getInk(t);n||(n=ie("span",Ot(Ot({role:"presentation","aria-hidden":!0,"data-p-ink":!0,"data-p-ink-active":!1,class:!this.isUnstyled()&&this.cx("root"),onAnimationEnd:this.onAnimationEnd.bind(this)},this.$attrSelector,""),"p-bind",this.ptm("root"))),t.appendChild(n),this.$el=n)},remove:function(t){var n=this.getInk(t);n&&(this.$host.style.overflow="",this.$host.style.position="",this.unbindEvents(t),n.removeEventListener("animationend",this.onAnimationEnd),n.remove())},onMouseDown:function(t){var n=this,o=t.currentTarget,r=this.getInk(o);if(!(!r||getComputedStyle(r,null).display==="none")){if(!this.isUnstyled()&&ct(r,"p-ink-active"),r.setAttribute("data-p-ink-active","false"),!wt(r)&&!Pt(r)){var i=Math.max(at(o),ee(o));r.style.height=i+"px",r.style.width=i+"px"}var d=ne(o),s=t.pageX-d.left+document.body.scrollTop-Pt(r)/2,a=t.pageY-d.top+document.body.scrollLeft-wt(r)/2;r.style.top=a+"px",r.style.left=s+"px",!this.isUnstyled()&&oe(r,"p-ink-active"),r.setAttribute("data-p-ink-active","true"),this.timeout=setTimeout(function(){r&&(!n.isUnstyled()&&ct(r,"p-ink-active"),r.setAttribute("data-p-ink-active","false"))},401)}},onAnimationEnd:function(t){this.timeout&&clearTimeout(this.timeout),!this.isUnstyled()&&ct(t.currentTarget,"p-ink-active"),t.currentTarget.setAttribute("data-p-ink-active","false")},getInk:function(t){return t&&t.children?Ue(t.children).find(function(n){return te(n,"data-pc-name")==="ripple"}):void 0}}}),Je=`
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-icon-only::after {
        content: " ";
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`;function tt(e){"@babel/helpers - typeof";return tt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},tt(e)}function _(e,t,n){return(t=Ye(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ye(e){var t=tn(e,"string");return tt(t)=="symbol"?t:t+""}function tn(e,t){if(tt(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var o=n.call(e,t);if(tt(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var en={root:function(t){var n=t.instance,o=t.props;return["p-button p-component",_(_(_(_(_(_(_(_(_({"p-button-icon-only":n.hasIcon&&!o.label&&!o.badge,"p-button-vertical":(o.iconPos==="top"||o.iconPos==="bottom")&&o.label,"p-button-loading":o.loading,"p-button-link":o.link||o.variant==="link"},"p-button-".concat(o.severity),o.severity),"p-button-raised",o.raised),"p-button-rounded",o.rounded),"p-button-text",o.text||o.variant==="text"),"p-button-outlined",o.outlined||o.variant==="outlined"),"p-button-sm",o.size==="small"),"p-button-lg",o.size==="large"),"p-button-plain",o.plain),"p-button-fluid",n.hasFluid)]},loadingIcon:"p-button-loading-icon",icon:function(t){var n=t.props;return["p-button-icon",_({},"p-button-icon-".concat(n.iconPos),n.label)]},label:"p-button-label"},nn=S.extend({name:"button",style:Je,classes:en}),on={name:"BaseButton",extends:N,props:{label:{type:String,default:null},icon:{type:String,default:null},iconPos:{type:String,default:"left"},iconClass:{type:[String,Object],default:null},badge:{type:String,default:null},badgeClass:{type:[String,Object],default:null},badgeSeverity:{type:String,default:"secondary"},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1},link:{type:Boolean,default:!1},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},variant:{type:String,default:null},plain:{type:Boolean,default:!1},fluid:{type:Boolean,default:null}},style:nn,provide:function(){return{$pcButton:this,$parentInstance:this}}};function et(e){"@babel/helpers - typeof";return et=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},et(e)}function w(e,t,n){return(t=rn(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function rn(e){var t=an(e,"string");return et(t)=="symbol"?t:t+""}function an(e,t){if(et(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var o=n.call(e,t);if(et(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var X={name:"Button",extends:on,inheritAttrs:!1,inject:{$pcFluid:{default:null}},methods:{getPTOptions:function(t){var n=t==="root"?this.ptmi:this.ptm;return n(t,{context:{disabled:this.disabled}})}},computed:{disabled:function(){return this.$attrs.disabled||this.$attrs.disabled===""||this.loading},defaultAriaLabel:function(){return this.label?this.label+(this.badge?" "+this.badge:""):this.$attrs.ariaLabel},hasIcon:function(){return this.icon||this.$slots.icon},attrs:function(){return f(this.asAttrs,this.a11yAttrs,this.getPTOptions("root"))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{"aria-label":this.defaultAriaLabel,"data-pc-name":"button","data-p-disabled":this.disabled,"data-p-severity":this.severity}},hasFluid:function(){return kt(this.fluid)?!!this.$pcFluid:this.fluid},dataP:function(){return L(w(w(w(w(w(w(w(w(w(w({},this.size,this.size),"icon-only",this.hasIcon&&!this.label&&!this.badge),"loading",this.loading),"fluid",this.hasFluid),"rounded",this.rounded),"raised",this.raised),"outlined",this.outlined||this.variant==="outlined"),"text",this.text||this.variant==="text"),"link",this.link||this.variant==="link"),"vertical",(this.iconPos==="top"||this.iconPos==="bottom")&&this.label))},dataIconP:function(){return L(w(w({},this.iconPos,this.iconPos),this.size,this.size))},dataLabelP:function(){return L(w(w({},this.size,this.size),"icon-only",this.hasIcon&&!this.label&&!this.badge))}},components:{SpinnerIcon:jt,Badge:Gt},directives:{ripple:Dt}},sn=["data-p"],ln=["data-p"];function dn(e,t,n,o,r,i){var d=G("SpinnerIcon"),s=G("Badge"),a=$t("ripple");return e.asChild?P(e.$slots,"default",{key:1,class:E(e.cx("root")),a11yAttrs:i.a11yAttrs}):q((u(),T(ht(e.as),f({key:0,class:e.cx("root"),"data-p":i.dataP},i.attrs),{default:O(function(){return[P(e.$slots,"default",{},function(){return[e.loading?P(e.$slots,"loadingicon",f({key:0,class:[e.cx("loadingIcon"),e.cx("icon")]},e.ptm("loadingIcon")),function(){return[e.loadingIcon?(u(),b("span",f({key:0,class:[e.cx("loadingIcon"),e.cx("icon"),e.loadingIcon]},e.ptm("loadingIcon")),null,16)):(u(),T(d,f({key:1,class:[e.cx("loadingIcon"),e.cx("icon")],spin:""},e.ptm("loadingIcon")),null,16,["class"]))]}):P(e.$slots,"icon",f({key:1,class:[e.cx("icon")]},e.ptm("icon")),function(){return[e.icon?(u(),b("span",f({key:0,class:[e.cx("icon"),e.icon,e.iconClass],"data-p":i.dataIconP},e.ptm("icon")),null,16,sn)):k("",!0)]}),e.label?(u(),b("span",f({key:2,class:e.cx("label")},e.ptm("label"),{"data-p":i.dataLabelP}),$(e.label),17,ln)):k("",!0),e.badge?(u(),T(s,{key:3,value:e.badge,class:E(e.badgeClass),severity:e.badgeSeverity,unstyled:e.unstyled,pt:e.ptm("pcBadge")},null,8,["value","class","severity","unstyled","pt"])):k("",!0)]})]}),_:3},16,["class","data-p"])),[[a]])}X.render=dn;const bt="/logo.svg",un={key:0,class:"inline-flex"},cn=["width","height"],pn={key:1,class:"inline-flex flex-col items-center gap-3"},bn=["width","height"],mn={class:"flex flex-col items-center gap-1.5"},fn={key:2,class:"inline-flex items-center gap-2.5"},hn=["width","height"],st=F({__name:"Logo",props:{variant:{default:"full"},size:{default:32},tagline:{type:Boolean,default:!1}},setup(e){return(t,n)=>e.variant==="mark"?(u(),b("span",un,[c("img",{src:bt,width:e.size,height:e.size,alt:"AFRIQX",class:"shrink-0",style:j({width:e.size+"px",height:e.size+"px"})},null,12,cn)])):e.variant==="stacked"?(u(),b("span",pn,[c("img",{src:bt,width:e.size,height:e.size,alt:"AFRIQX",style:j({width:e.size+"px",height:e.size+"px"})},null,12,bn),c("span",mn,[c("span",{class:"font-display font-black tracking-[0.14em] leading-none text-ivory select-none",style:j({fontSize:e.size*.66+"px"})},[...n[0]||(n[0]=[I(" AFRI",-1),c("span",{class:"text-emerald-500"},"Q",-1),c("span",{class:"text-emerald-400"},"X",-1)])],4),e.tagline?(u(),b("span",{key:0,class:"font-display font-medium tracking-[0.2em] text-platinum-400 uppercase",style:j({fontSize:Math.max(8,e.size*.16)+"px"})},[...n[1]||(n[1]=[I(" African Markets. African Value. ",-1),c("span",{class:"text-emerald-400"},"African Future.",-1)])],4)):k("",!0)])])):(u(),b("span",fn,[c("img",{src:bt,width:e.size,height:e.size,alt:"AFRIQX",class:"shrink-0",style:j({width:e.size+"px",height:e.size+"px"})},null,12,hn),c("span",{class:"font-display font-black tracking-[0.14em] leading-none text-ivory select-none",style:j({fontSize:e.size*.66+"px"})},[...n[2]||(n[2]=[I(" AFRI",-1),c("span",{class:"text-emerald-500"},"Q",-1),c("span",{class:"text-emerald-400"},"X",-1)])],4)]))}}),jo=[{symbol:"AFQX 50",name:"Pan-African Composite",value:2158.45,change:3.45,series:[2010,2032,2025,2068,2090,2075,2120,2143,2158]},{symbol:"SAHARA 100",name:"Cross-Continental Enterprise",value:3245.8,change:2.91,series:[3120,3140,3132,3175,3190,3210,3225,3240,3246]},{symbol:"NILE TECH",name:"African Technology",value:1872.36,change:4.32,series:[1760,1788,1772,1810,1835,1820,1855,1868,1872]},{symbol:"KIFARU BANKS",name:"African Banking Sector",value:2612.18,change:2.18,series:[2540,2558,2549,2575,2588,2600,2596,2608,2612]},{symbol:"BAOBAB SMALLCAP",name:"Emerging African Business",value:1105.72,change:1.32,series:[1078,1085,1080,1092,1098,1090,1100,1103,1106]},{symbol:"UBUNTU ESG",name:"Sustainability & Governance",value:1643.9,change:2.75,series:[1590,1605,1598,1618,1630,1622,1638,1641,1644]}],Go={symbol:"AFXI",value:98.65,change:.72},Do=[{pair:"NGN/KES",name:"Naira / Shilling",rate:.1524,change:1.38},{pair:"ZAR/NGN",name:"Rand / Naira",rate:26.45,change:1.12},{pair:"GHS/KES",name:"Cedi / Shilling",rate:92.35,change:-.28},{pair:"EGP/NGN",name:"Pound / Naira",rate:18.75,change:2.11},{pair:"ETB/ZAR",name:"Birr / Rand",rate:.32,change:-.45}],Vo=[{symbol:"AIRTEL AFRIQX",name:"Airtel Africa",price:"KES 123.45",change:2.35},{symbol:"MTN GROUP",name:"MTN Group",price:"ZAR 1,764.00",change:4.21},{symbol:"NASPERS",name:"Naspers Ltd",price:"ZAR 3,214.50",change:3.18},{symbol:"DANGCEM",name:"Dangote Cement",price:"NGN 682.50",change:7.21},{symbol:"SAFARICOM",name:"Safaricom PLC",price:"KES 19.35",change:3.18},{symbol:"EGX EGYPT",name:"Egyptian Exchange",price:"EGP 18.75",change:2.11},{symbol:"ABSA GROUP",name:"Absa Group",price:"ZAR 186.20",change:1.89},{symbol:"LOSSENIAM",name:"Losseniam Gold",price:"GHS 28.40",change:3.42}];function gn(e){let t=e;return function(){t|=0,t=t+1831565813|0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function vn(e,t,n){const o=gn(n),r=[];let i=t;for(let d=0;d<e;d++){const l=i,p=(o()-.5)*.018+6e-4,h=l*(1+p),g=Math.max(l,h)*(1+o()*.01),y=Math.min(l,h)*(1-o()*.01),A=Math.round(2e6+o()*6e6);r.push({i:d,open:l,high:g,low:y,close:h,volume:A}),i=h}return r}const Ko={pair:"NGN / KES",name:"Nigerian Naira / Kenyan Shilling",flag:"🇳🇬",price:.1524,change:1.38,changeAbs:.0021,high24h:.1538,low24h:.1496,volume24h:"₦45.62B"},Uo=vn(120,.1402,5198243),Ho=["1m","5m","15m","1H","4H","1D","1W"],yn=[{label:"Dashboard",icon:"dashboard",href:"/",mobile:!0},{label:"Markets",icon:"markets",href:"/markets",mobile:!0},{label:"Watchlist",icon:"watchlist",href:"/watchlist"},{label:"Trade",icon:"trade",href:"/trade",mobile:!0},{label:"Portfolio",icon:"portfolio",href:"/portfolio",mobile:!0},{label:"Orders",icon:"orders",href:"/orders"},{label:"Analytics",icon:"analytics",href:"/analytics"},{label:"News & Insights",icon:"news",href:"/news"},{label:"AFX Explore",icon:"explore",href:"/explore",badge:"NEW"},{label:"Settings",icon:"settings",href:"/settings"}],qo=[{symbol:"DANGCEM",name:"Dangote Cement",price:"NGN 682.50",change:7.21,series:[636,642,650,648,661,670,682]},{symbol:"NBL",name:"Nile Breweries",price:"KES 4.35",change:6.18,series:[4.05,4.1,4.08,4.18,4.25,4.3,4.35]},{symbol:"JUMIA",name:"Jumia Technologies",price:"EGP 18.75",change:5.32,series:[17.6,17.9,17.8,18.1,18.4,18.6,18.75]},{symbol:"EQTY",name:"Equity Group Holdings",price:"KES 44.10",change:4.89,series:[41.8,42.3,42.1,43,43.6,43.9,44.1]},{symbol:"MTNN",name:"MTN Nigeria",price:"NGN 432.50",change:4.35,series:[412,416,414,422,428,430,432.5]}],Xo=[{title:"Afriqx Launches Intra-African Currency Trading Pairs",category:"Markets",time:"2h ago"},{title:"African Markets Extend Gains as Investor Confidence Rises",category:"Equities",time:"4h ago"},{title:"PAPSS Boosts Cross-Border Settlements Across 15 African Countries",category:"Economy",time:"6h ago"}],Zo={total:"$124,568.75",change:6.26,changeAbs:"+$7,345.60",allocations:[{label:"Equities",value:"$74,741.25",pct:60,color:"#1fae5f"},{label:"ETFs",value:"$24,913.75",pct:20,color:"#34d27b"},{label:"Bonds",value:"$12,456.88",pct:10,color:"#c79b3f"},{label:"Cash",value:"$12,456.87",pct:10,color:"#8b9694"}]},Wo=[{type:"Market",symbol:"AIRTEL AFRIQX",side:"Buy",status:"Filled",price:"123.45"},{type:"Limit",symbol:"MTN GROUP",side:"Buy",status:"Filled",price:"1,764.00"},{type:"Limit",symbol:"SAFARICOM",side:"Sell",status:"Pending",price:"19.50"},{type:"Market",symbol:"DANGCEM",side:"Buy",status:"Filled",price:"682.50"},{type:"Limit",symbol:"NILE BREWERIES",side:"Buy",status:"Filled",price:"4.35"}],Qo={strong:[{code:"ZAR",change:1.35},{code:"NGN",change:1.28},{code:"KES",change:1.18}],neutral:[{code:"GHS",change:.32},{code:"EGP",change:.21}],weak:[{code:"UGX",change:-.45},{code:"XOF",change:-.62},{code:"ETB",change:-.91}]},xn=[{label:"AFQX 50",value:"2,158.45",change:3.45},{label:"AFXI",value:"98.65",change:.72},{label:"NGN/KES",value:"0.1524",change:1.38},{label:"ZAR/NGN",value:"26.45",change:1.12},{label:"GHS/NGN",value:"92.35",change:-.28}],rt={name:"Amara Okafor",tier:"Pro Trader"},Jo=[{symbol:"DANGCEM",name:"Dangote Cement",exchange:"NGX",sector:"Materials",last:"NGN 682.50",change:7.21,marketCap:"₦11.6T",volume:"4.2M",series:[636,642,650,648,661,670,682]},{symbol:"MTNN",name:"MTN Nigeria",exchange:"NGX",sector:"Telecom",last:"NGN 432.50",change:4.35,marketCap:"₦9.0T",volume:"8.1M",series:[412,416,414,422,428,430,432]},{symbol:"SAFCOM",name:"Safaricom PLC",exchange:"NSE",sector:"Telecom",last:"KES 19.35",change:3.18,marketCap:"KES 775B",volume:"12.4M",series:[18.6,18.8,18.7,19,19.2,19.3,19.35]},{symbol:"MTNG",name:"MTN Group",exchange:"JSE",sector:"Telecom",last:"ZAR 1,764.00",change:4.21,marketCap:"R332B",volume:"2.1M",series:[1690,1705,1698,1722,1748,1755,1764]},{symbol:"NPN",name:"Naspers Ltd",exchange:"JSE",sector:"Technology",last:"ZAR 3,214.50",change:3.18,marketCap:"R1.4T",volume:"1.3M",series:[3105,3130,3120,3170,3190,3205,3214]},{symbol:"EQTY",name:"Equity Group Holdings",exchange:"NSE",sector:"Banking",last:"KES 44.10",change:4.89,marketCap:"KES 166B",volume:"5.6M",series:[41.8,42.3,42.1,43,43.6,43.9,44.1]},{symbol:"ABG",name:"Absa Group",exchange:"JSE",sector:"Banking",last:"ZAR 186.20",change:1.89,marketCap:"R157B",volume:"3.4M",series:[182,183,182.5,184,185,185.8,186.2]},{symbol:"JMIA",name:"Jumia Technologies",exchange:"EGX",sector:"Technology",last:"EGP 18.75",change:5.32,marketCap:"$1.9B",volume:"9.8M",series:[17.6,17.9,17.8,18.1,18.4,18.6,18.75]},{symbol:"COMI",name:"Commercial Intl Bank",exchange:"EGX",sector:"Banking",last:"EGP 84.20",change:-.62,marketCap:"EGP 252B",volume:"6.1M",series:[85.1,84.9,85,84.6,84.4,84.3,84.2]},{symbol:"GCB",name:"GCB Bank",exchange:"GSE",sector:"Banking",last:"GHS 6.45",change:2.05,marketCap:"GHS 1.7B",volume:"1.1M",series:[6.28,6.31,6.3,6.37,6.41,6.43,6.45]}],Yo=[{symbol:"COCOA",name:"Cocoa",last:"$9,240",change:2.84,unit:"/ tonne",series:[8900,8980,8950,9080,9150,9200,9240]},{symbol:"GOLD",name:"Gold",last:"$2,348.50",change:.92,unit:"/ oz",series:[2320,2330,2325,2338,2342,2345,2348]},{symbol:"CRUDE",name:"Brent Crude",last:"$82.15",change:-1.24,unit:"/ bbl",series:[83.6,83.2,83.4,82.8,82.5,82.3,82.1]},{symbol:"COFFEE",name:"Coffee (Arabica)",last:"$2.41",change:3.1,unit:"/ lb",series:[2.31,2.34,2.33,2.37,2.39,2.4,2.41]},{symbol:"PLAT",name:"Platinum",last:"$978.40",change:1.45,unit:"/ oz",series:[958,963,960,969,973,976,978]},{symbol:"COPPER",name:"Copper",last:"$4.28",change:-.55,unit:"/ lb",series:[4.32,4.3,4.31,4.29,4.28,4.28,4.28]}],ti=[{code:"NGN",name:"Nigerian Naira"},{code:"KES",name:"Kenyan Shilling"},{code:"ZAR",name:"South African Rand"},{code:"GHS",name:"Ghanaian Cedi"},{code:"EGP",name:"Egyptian Pound"}],ei=[{symbol:"DANGCEM",name:"Dangote Cement",qty:"12,500",avgCost:"NGN 612.00",last:"NGN 682.50",value:"$26,180.20",pnl:11.52,pnlAbs:"+$2,704.10",weight:21},{symbol:"MTNG",name:"MTN Group",qty:"1,800",avgCost:"ZAR 1,540.00",last:"ZAR 1,764.00",value:"$18,742.50",pnl:14.55,pnlAbs:"+$2,381.20",weight:15},{symbol:"SAFCOM",name:"Safaricom PLC",qty:"84,000",avgCost:"KES 17.80",last:"KES 19.35",value:"$15,640.75",pnl:8.71,pnlAbs:"+$1,253.40",weight:12.6},{symbol:"NPN",name:"Naspers Ltd",qty:"640",avgCost:"ZAR 2,980.00",last:"ZAR 3,214.50",value:"$13,420.00",pnl:7.87,pnlAbs:"+$979.60",weight:10.8},{symbol:"EQTY",name:"Equity Group",qty:"210,000",avgCost:"KES 41.20",last:"KES 44.10",value:"$11,890.30",pnl:7.04,pnlAbs:"+$782.10",weight:9.5},{symbol:"JMIA",name:"Jumia Technologies",qty:"9,400",avgCost:"EGP 19.90",last:"EGP 18.75",value:"$3,620.40",pnl:-5.78,pnlAbs:"-$222.10",weight:2.9}],ni={totalValue:"$124,568.75",dayChange:6.26,totalPnl:18.42,totalPnlAbs:"+$19,378.30",buyingPower:"$12,456.87",invested:"$105,190.45"},oi=[{date:"2026-05-29 09:42",symbol:"AIRTEL AFRIQX",type:"Market",side:"Buy",qty:"5,000",price:"KES 123.45",status:"Filled"},{date:"2026-05-29 09:31",symbol:"MTN GROUP",type:"Limit",side:"Buy",qty:"1,200",price:"ZAR 1,764.00",status:"Filled"},{date:"2026-05-29 09:18",symbol:"SAFARICOM",type:"Limit",side:"Sell",qty:"30,000",price:"KES 19.50",status:"Pending"},{date:"2026-05-28 15:54",symbol:"DANGCEM",type:"Market",side:"Buy",qty:"2,500",price:"NGN 682.50",status:"Filled"},{date:"2026-05-28 14:07",symbol:"NILE BREWERIES",type:"Limit",side:"Buy",qty:"8,000",price:"KES 4.35",status:"Filled"},{date:"2026-05-28 11:22",symbol:"JUMIA",type:"Stop",side:"Sell",qty:"4,000",price:"EGP 18.20",status:"Cancelled"},{date:"2026-05-27 16:40",symbol:"EQUITY GROUP",type:"Market",side:"Buy",qty:"15,000",price:"KES 44.10",status:"Filled"},{date:"2026-05-27 10:05",symbol:"NASPERS",type:"Limit",side:"Buy",qty:"300",price:"ZAR 3,180.00",status:"Filled"}],ii=[100,103.2,101.8,106.5,109.1,107.4,112.8,115.3,113.9,119.2,122.6,124.6],ri=[{label:"Total Return",value:"+24.57%",change:24.57},{label:"Best Sector",value:"Telecom",sub:"+12.4%"},{label:"Volatility",value:"11.8%",sub:"30-day"},{label:"Sharpe Ratio",value:"1.84",sub:"annualised"}],ai=[{label:"Telecom",pct:34,color:"#1fae5f"},{label:"Banking",pct:28,color:"#34d27b"},{label:"Materials",pct:18,color:"#c79b3f"},{label:"Technology",pct:12,color:"#d9b769"},{label:"Consumer",pct:8,color:"#8b9694"}],si=[{title:"Afriqx Launches Intra-African Currency Trading Pairs",excerpt:"Direct NGN/KES, ZAR/NGN and more — settling African trade without routing through the US Dollar.",category:"Markets",time:"2h ago",accent:"from-emerald-600/40"},{title:"PAPSS Boosts Cross-Border Settlements Across 15 Countries",excerpt:"The Pan-African Payment and Settlement System reports record continental clearing volumes this quarter.",category:"Economy",time:"6h ago",accent:"from-gold-600/40"},{title:"AFQX 50 Hits Record High as Investor Confidence Climbs",excerpt:"The pan-African composite gained 3.45% on the back of strong telecom and banking earnings.",category:"Equities",time:"8h ago",accent:"from-emerald-700/40"}],li=[{title:"African Markets Extend Gains as Investor Confidence Rises",category:"Equities",time:"4h ago"},{title:"Dangote Cement Leads Gainers on Strong Q2 Output",category:"Markets",time:"5h ago"},{title:"Naira Strengthens Against Regional Peers on AFXI",category:"FX",time:"7h ago"},{title:"Safaricom Expands M-Pesa Rails Into Three New Markets",category:"Technology",time:"9h ago"},{title:"Continental Reserve Index Signals Improving Stability",category:"Economy",time:"11h ago"},{title:"NILE TECH Index Rallies on African Fintech Momentum",category:"Markets",time:"13h ago"}],di=[{name:"Afriqx Exchange",tagline:"Primary trading & market infrastructure.",icon:"markets"},{name:"Afriqx FX",tagline:"Direct African currency exchange — no USD routing.",icon:"trade"},{name:"Afriqx Intelligence",tagline:"Data analytics & institutional insights.",icon:"analytics",badge:"NEW"},{name:"Afriqx Terminal",tagline:"Professional institutional trading workspace.",icon:"dashboard"},{name:"Afriqx Markets",tagline:"Live market data & trading environment.",icon:"watchlist"},{name:"Afriqx API",tagline:"Developer-focused financial infrastructure APIs.",icon:"explore"}],ui=[{n:"01",title:"Market Exchange Core",desc:"Ultra-low-latency engine for equities, ETFs, debt, commodities and tokenized assets."},{n:"02",title:"African FX Engine",desc:"Direct African currency conversion without routing through the US Dollar."},{n:"03",title:"Pan-African Liquidity Network",desc:"Connecting banks, fintechs, mobile money, brokers and regional exchanges."},{n:"04",title:"Data & Intelligence Layer",desc:"Bloomberg-scale African market analytics, FX heatmaps and capital-flow monitoring."},{n:"05",title:"AI Market Layer",desc:"Predictive liquidity modeling, currency-stress detection and automated reporting."}],kn={dashboard:"pi pi-objects-column",markets:"pi pi-chart-line",watchlist:"pi pi-eye",trade:"pi pi-arrow-right-arrow-left",portfolio:"pi pi-briefcase",orders:"pi pi-receipt",analytics:"pi pi-chart-bar",news:"pi pi-megaphone",explore:"pi pi-compass",settings:"pi pi-cog"},$n={class:"hidden h-full w-60 shrink-0 flex-col border-r border-obsidian-500/60 bg-obsidian-850 lg:flex"},Sn={class:"flex h-16 items-center px-5"},wn={class:"flex-1 space-y-1 overflow-y-auto px-3 py-2"},Pn={class:"flex-1 truncate"},An={key:0,class:"rounded bg-gold-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold-300"},In={class:"mx-3 mb-3 rounded-xl border border-obsidian-500/60 bg-obsidian-800 p-4"},_n=F({__name:"AppSidebar",setup(e){const t=Nt();return(n,o)=>{const r=G("RouterLink");return u(),b("aside",$n,[c("div",Sn,[v(st,{variant:"full",size:26})]),c("nav",wn,[(u(!0),b(C,null,D(x(yn),i=>(u(),T(r,{key:i.label,to:i.href,class:E(["group flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",x(t).name===i.label?"bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/25":"text-platinum-300 hover:bg-obsidian-700/70 hover:text-ivory"])},{default:O(()=>[c("i",{class:E([x(kn)[i.icon],"text-base"])},null,2),c("span",Pn,$(i.label),1),i.badge?(u(),b("span",An,$(i.badge),1)):k("",!0)]),_:2},1032,["to","class"]))),128))]),c("div",In,[v(st,{variant:"full",size:20,class:"mb-3"}),o[0]||(o[0]=c("p",{class:"font-display text-sm font-bold text-ivory"},[I("The Home of"),c("br"),I("African Markets")],-1)),o[1]||(o[1]=c("p",{class:"mt-1 text-xs text-platinum-400"},"Trade. Invest. Build Africa.",-1)),v(x(X),{label:"Upgrade to Pro",size:"small",severity:"warn",class:"mt-3 w-full font-display font-semibold"})]),o[2]||(o[2]=Ft('<div class="border-t border-obsidian-500/60 px-5 py-3"><div class="flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/70"></span><span class="text-[11px] font-medium text-platinum-300">All Systems Operational</span></div><p class="mt-1 nums text-[10px] text-platinum-400">Connected · EAT 09:45:32</p></div>',1))])}}});var Cn=`
    .p-iconfield {
        position: relative;
        display: block;
    }

    .p-inputicon {
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * (dt('icon.size') / 2));
        color: dt('iconfield.icon.color');
        line-height: 1;
        z-index: 1;
    }

    .p-iconfield .p-inputicon:first-child {
        inset-inline-start: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputicon:last-child {
        inset-inline-end: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputtext:not(:first-child),
    .p-iconfield .p-inputwrapper:not(:first-child) .p-inputtext {
        padding-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield .p-inputtext:not(:last-child) {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield:has(.p-inputfield-sm) .p-inputicon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
        margin-top: calc(-1 * (dt('form.field.sm.font.size') / 2));
    }

    .p-iconfield:has(.p-inputfield-lg) .p-inputicon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
        margin-top: calc(-1 * (dt('form.field.lg.font.size') / 2));
    }
`,En={root:"p-iconfield"},Tn=S.extend({name:"iconfield",style:Cn,classes:En}),On={name:"BaseIconField",extends:N,style:Tn,provide:function(){return{$pcIconField:this,$parentInstance:this}}},Vt={name:"IconField",extends:On,inheritAttrs:!1};function Ln(e,t,n,o,r,i){return u(),b("div",f({class:e.cx("root")},e.ptmi("root")),[P(e.$slots,"default")],16)}Vt.render=Ln;var Nn={root:"p-inputicon"},Fn=S.extend({name:"inputicon",classes:Nn}),Mn={name:"BaseInputIcon",extends:N,style:Fn,props:{class:null},provide:function(){return{$pcInputIcon:this,$parentInstance:this}}},Kt={name:"InputIcon",extends:Mn,inheritAttrs:!1,computed:{containerClass:function(){return[this.cx("root"),this.class]}}};function Bn(e,t,n,o,r,i){return u(),b("span",f({class:i.containerClass},e.ptmi("root"),{"aria-hidden":"true"}),[P(e.$slots,"default")],16)}Kt.render=Bn;var zn={name:"BaseEditableHolder",extends:N,emits:["update:modelValue","value-change"],props:{modelValue:{type:null,default:void 0},defaultValue:{type:null,default:void 0},name:{type:String,default:void 0},invalid:{type:Boolean,default:void 0},disabled:{type:Boolean,default:!1},formControl:{type:Object,default:void 0}},inject:{$parentInstance:{default:void 0},$pcForm:{default:void 0},$pcFormField:{default:void 0}},data:function(){return{d_value:this.defaultValue!==void 0?this.defaultValue:this.modelValue}},watch:{modelValue:{deep:!0,handler:function(t){this.d_value=t}},defaultValue:function(t){this.d_value=t},$formName:{immediate:!0,handler:function(t){var n,o;this.formField=((n=this.$pcForm)===null||n===void 0||(o=n.register)===null||o===void 0?void 0:o.call(n,t,this.$formControl))||{}}},$formControl:{immediate:!0,handler:function(t){var n,o;this.formField=((n=this.$pcForm)===null||n===void 0||(o=n.register)===null||o===void 0?void 0:o.call(n,this.$formName,t))||{}}},$formDefaultValue:{immediate:!0,handler:function(t){this.d_value!==t&&(this.d_value=t)}},$formValue:{immediate:!1,handler:function(t){var n;(n=this.$pcForm)!==null&&n!==void 0&&n.getFieldState(this.$formName)&&t!==this.d_value&&(this.d_value=t)}}},formField:{},methods:{writeValue:function(t,n){var o,r;this.controlled&&(this.d_value=t,this.$emit("update:modelValue",t)),this.$emit("value-change",t),(o=(r=this.formField).onChange)===null||o===void 0||o.call(r,{originalEvent:n,value:t})},findNonEmpty:function(){for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];return n.find(Z)}},computed:{$filled:function(){return Z(this.d_value)},$invalid:function(){var t,n;return!this.$formNovalidate&&this.findNonEmpty(this.invalid,(t=this.$pcFormField)===null||t===void 0||(t=t.$field)===null||t===void 0?void 0:t.invalid,(n=this.$pcForm)===null||n===void 0||(n=n.getFieldState(this.$formName))===null||n===void 0?void 0:n.invalid)},$formName:function(){var t;return this.$formNovalidate?void 0:this.name||((t=this.$formControl)===null||t===void 0?void 0:t.name)},$formControl:function(){var t;return this.formControl||((t=this.$pcFormField)===null||t===void 0?void 0:t.formControl)},$formNovalidate:function(){var t;return(t=this.$formControl)===null||t===void 0?void 0:t.novalidate},$formDefaultValue:function(){var t,n;return this.findNonEmpty(this.d_value,(t=this.$pcFormField)===null||t===void 0?void 0:t.initialValue,(n=this.$pcForm)===null||n===void 0||(n=n.initialValues)===null||n===void 0?void 0:n[this.$formName])},$formValue:function(){var t,n;return this.findNonEmpty((t=this.$pcFormField)===null||t===void 0||(t=t.$field)===null||t===void 0?void 0:t.value,(n=this.$pcForm)===null||n===void 0||(n=n.getFieldState(this.$formName))===null||n===void 0?void 0:n.value)},controlled:function(){return this.$inProps.hasOwnProperty("modelValue")||!this.$inProps.hasOwnProperty("modelValue")&&!this.$inProps.hasOwnProperty("defaultValue")},filled:function(){return this.$filled}}},Rn={name:"BaseInput",extends:zn,props:{size:{type:String,default:null},fluid:{type:Boolean,default:null},variant:{type:String,default:null}},inject:{$parentInstance:{default:void 0},$pcFluid:{default:void 0}},computed:{$variant:function(){var t;return(t=this.variant)!==null&&t!==void 0?t:this.$primevue.config.inputStyle||this.$primevue.config.inputVariant},$fluid:function(){var t;return(t=this.fluid)!==null&&t!==void 0?t:!!this.$pcFluid},hasFluid:function(){return this.$fluid}}},jn=`
    .p-inputtext {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('inputtext.color');
        background: dt('inputtext.background');
        padding-block: dt('inputtext.padding.y');
        padding-inline: dt('inputtext.padding.x');
        border: 1px solid dt('inputtext.border.color');
        transition:
            background dt('inputtext.transition.duration'),
            color dt('inputtext.transition.duration'),
            border-color dt('inputtext.transition.duration'),
            outline-color dt('inputtext.transition.duration'),
            box-shadow dt('inputtext.transition.duration');
        appearance: none;
        border-radius: dt('inputtext.border.radius');
        outline-color: transparent;
        box-shadow: dt('inputtext.shadow');
    }

    .p-inputtext:enabled:hover {
        border-color: dt('inputtext.hover.border.color');
    }

    .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
        box-shadow: dt('inputtext.focus.ring.shadow');
        outline: dt('inputtext.focus.ring.width') dt('inputtext.focus.ring.style') dt('inputtext.focus.ring.color');
        outline-offset: dt('inputtext.focus.ring.offset');
    }

    .p-inputtext.p-invalid {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.p-variant-filled {
        background: dt('inputtext.filled.background');
    }

    .p-inputtext.p-variant-filled:enabled:hover {
        background: dt('inputtext.filled.hover.background');
    }

    .p-inputtext.p-variant-filled:enabled:focus {
        background: dt('inputtext.filled.focus.background');
    }

    .p-inputtext:disabled {
        opacity: 1;
        background: dt('inputtext.disabled.background');
        color: dt('inputtext.disabled.color');
    }

    .p-inputtext::placeholder {
        color: dt('inputtext.placeholder.color');
    }

    .p-inputtext.p-invalid::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }

    .p-inputtext-sm {
        font-size: dt('inputtext.sm.font.size');
        padding-block: dt('inputtext.sm.padding.y');
        padding-inline: dt('inputtext.sm.padding.x');
    }

    .p-inputtext-lg {
        font-size: dt('inputtext.lg.font.size');
        padding-block: dt('inputtext.lg.padding.y');
        padding-inline: dt('inputtext.lg.padding.x');
    }

    .p-inputtext-fluid {
        width: 100%;
    }
`,Gn={root:function(t){var n=t.instance,o=t.props;return["p-inputtext p-component",{"p-filled":n.$filled,"p-inputtext-sm p-inputfield-sm":o.size==="small","p-inputtext-lg p-inputfield-lg":o.size==="large","p-invalid":n.$invalid,"p-variant-filled":n.$variant==="filled","p-inputtext-fluid":n.$fluid}]}},Dn=S.extend({name:"inputtext",style:jn,classes:Gn}),Vn={name:"BaseInputText",extends:Rn,style:Dn,provide:function(){return{$pcInputText:this,$parentInstance:this}}};function nt(e){"@babel/helpers - typeof";return nt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},nt(e)}function Kn(e,t,n){return(t=Un(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Un(e){var t=Hn(e,"string");return nt(t)=="symbol"?t:t+""}function Hn(e,t){if(nt(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var o=n.call(e,t);if(nt(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Ut={name:"InputText",extends:Vn,inheritAttrs:!1,methods:{onInput:function(t){this.writeValue(t.target.value,t)}},computed:{attrs:function(){return f(this.ptmi("root",{context:{filled:this.$filled,disabled:this.disabled}}),this.formField)},dataP:function(){return L(Kn({invalid:this.$invalid,fluid:this.$fluid,filled:this.$variant==="filled"},this.size,this.size))}}},qn=["value","name","disabled","aria-invalid","data-p"];function Xn(e,t,n,o,r,i){return u(),b("input",f({type:"text",class:e.cx("root"),value:e.d_value,name:e.name,disabled:e.disabled,"aria-invalid":e.$invalid||void 0,"data-p":i.dataP,onInput:t[0]||(t[0]=function(){return i.onInput&&i.onInput.apply(i,arguments)})},i.attrs),null,16,qn)}Ut.render=Xn;var Zn=ae(),Ht={name:"Portal",props:{appendTo:{type:[String,Object],default:"body"},disabled:{type:Boolean,default:!1}},data:function(){return{mounted:!1}},mounted:function(){this.mounted=se()},computed:{inline:function(){return this.disabled||this.appendTo==="self"}}};function Wn(e,t,n,o,r,i){return i.inline?P(e.$slots,"default",{key:0}):r.mounted?(u(),T(le,{key:1,to:n.appendTo},[P(e.$slots,"default")],8,["to"])):k("",!0)}Ht.render=Wn;var Qn=`
    .p-menu {
        background: dt('menu.background');
        color: dt('menu.color');
        border: 1px solid dt('menu.border.color');
        border-radius: dt('menu.border.radius');
        min-width: 12.5rem;
    }

    .p-menu-list {
        margin: 0;
        padding: dt('menu.list.padding');
        outline: 0 none;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: dt('menu.list.gap');
    }

    .p-menu-item-content {
        transition:
            background dt('menu.transition.duration'),
            color dt('menu.transition.duration');
        border-radius: dt('menu.item.border.radius');
        color: dt('menu.item.color');
        overflow: hidden;
    }

    .p-menu-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('menu.item.padding');
        gap: dt('menu.item.gap');
        user-select: none;
        outline: 0 none;
    }

    .p-menu-item-label {
        line-height: 1;
    }

    .p-menu-item-icon {
        color: dt('menu.item.icon.color');
    }

    .p-menu-item.p-focus .p-menu-item-content {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item.p-focus .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-overlay {
        box-shadow: dt('menu.shadow');
    }

    .p-menu-submenu-label {
        background: dt('menu.submenu.label.background');
        padding: dt('menu.submenu.label.padding');
        color: dt('menu.submenu.label.color');
        font-weight: dt('menu.submenu.label.font.weight');
    }

    .p-menu-separator {
        border-block-start: 1px solid dt('menu.separator.border.color');
    }
`,Jn={root:function(t){var n=t.props;return["p-menu p-component",{"p-menu-overlay":n.popup}]},start:"p-menu-start",list:"p-menu-list",submenuLabel:"p-menu-submenu-label",separator:"p-menu-separator",end:"p-menu-end",item:function(t){var n=t.instance;return["p-menu-item",{"p-focus":n.id===n.focusedOptionId,"p-disabled":n.disabled()}]},itemContent:"p-menu-item-content",itemLink:"p-menu-item-link",itemIcon:"p-menu-item-icon",itemLabel:"p-menu-item-label"},Yn=S.extend({name:"menu",style:Qn,classes:Jn}),to={name:"BaseMenu",extends:N,props:{popup:{type:Boolean,default:!1},model:{type:Array,default:null},appendTo:{type:[String,Object],default:"body"},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:Yn,provide:function(){return{$pcMenu:this,$parentInstance:this}}},qt={name:"Menuitem",hostName:"Menu",extends:N,inheritAttrs:!1,emits:["item-click","item-mousemove"],props:{item:null,templates:null,id:null,focusedOptionId:null,index:null},methods:{getItemProp:function(t,n){return t&&t.item?mt(t.item[n]):void 0},getPTOptions:function(t){return this.ptm(t,{context:{item:this.item,index:this.index,focused:this.isItemFocused(),disabled:this.disabled()}})},isItemFocused:function(){return this.focusedOptionId===this.id},onItemClick:function(t){var n=this.getItemProp(this.item,"command");n&&n({originalEvent:t,item:this.item.item}),this.$emit("item-click",{originalEvent:t,item:this.item,id:this.id})},onItemMouseMove:function(t){this.$emit("item-mousemove",{originalEvent:t,item:this.item,id:this.id})},visible:function(){return typeof this.item.visible=="function"?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled=="function"?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label=="function"?this.item.label():this.item.label},getMenuItemProps:function(t){return{action:f({class:this.cx("itemLink"),tabindex:"-1"},this.getPTOptions("itemLink")),icon:f({class:[this.cx("itemIcon"),t.icon]},this.getPTOptions("itemIcon")),label:f({class:this.cx("itemLabel")},this.getPTOptions("itemLabel"))}}},computed:{dataP:function(){return L({focus:this.isItemFocused(),disabled:this.disabled()})}},directives:{ripple:Dt}},eo=["id","aria-label","aria-disabled","data-p-focused","data-p-disabled","data-p"],no=["data-p"],oo=["href","target"],io=["data-p"],ro=["data-p"];function ao(e,t,n,o,r,i){var d=$t("ripple");return i.visible()?(u(),b("li",f({key:0,id:n.id,class:[e.cx("item"),n.item.class],role:"menuitem",style:n.item.style,"aria-label":i.label(),"aria-disabled":i.disabled(),"data-p-focused":i.isItemFocused(),"data-p-disabled":i.disabled()||!1,"data-p":i.dataP},i.getPTOptions("item")),[c("div",f({class:e.cx("itemContent"),onClick:t[0]||(t[0]=function(s){return i.onItemClick(s)}),onMousemove:t[1]||(t[1]=function(s){return i.onItemMouseMove(s)}),"data-p":i.dataP},i.getPTOptions("itemContent")),[n.templates.item?n.templates.item?(u(),T(ht(n.templates.item),{key:1,item:n.item,label:i.label(),props:i.getMenuItemProps(n.item)},null,8,["item","label","props"])):k("",!0):q((u(),b("a",f({key:0,href:n.item.url,class:e.cx("itemLink"),target:n.item.target,tabindex:"-1"},i.getPTOptions("itemLink")),[n.templates.itemicon?(u(),T(ht(n.templates.itemicon),{key:0,item:n.item,class:E(e.cx("itemIcon"))},null,8,["item","class"])):n.item.icon?(u(),b("span",f({key:1,class:[e.cx("itemIcon"),n.item.icon],"data-p":i.dataP},i.getPTOptions("itemIcon")),null,16,io)):k("",!0),c("span",f({class:e.cx("itemLabel"),"data-p":i.dataP},i.getPTOptions("itemLabel")),$(i.label()),17,ro)],16,oo)),[[d]])],16,no)],16,eo)):k("",!0)}qt.render=ao;function Lt(e){return co(e)||uo(e)||lo(e)||so()}function so(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function lo(e,t){if(e){if(typeof e=="string")return xt(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?xt(e,t):void 0}}function uo(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function co(e){if(Array.isArray(e))return xt(e)}function xt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var St={name:"Menu",extends:to,inheritAttrs:!1,emits:["show","hide","focus","blur"],data:function(){return{overlayVisible:!1,focused:!1,focusedOptionIndex:-1,selectedOptionIndex:-1}},target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,list:null,mounted:function(){this.popup||(this.bindResizeListener(),this.bindOutsideClickListener())},beforeUnmount:function(){this.unbindResizeListener(),this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.target=null,this.container&&this.autoZIndex&&pt.clear(this.container),this.container=null},methods:{itemClick:function(t){var n=t.item;this.disabled(n)||(n.command&&n.command(t),this.overlayVisible&&this.hide(),!this.popup&&this.focusedOptionIndex!==t.id&&(this.focusedOptionIndex=t.id))},itemMouseMove:function(t){this.focused&&(this.focusedOptionIndex=t.id)},onListFocus:function(t){this.focused=!0,!this.popup&&this.changeFocusedOptionIndex(0),this.$emit("focus",t)},onListBlur:function(t){this.focused=!1,this.focusedOptionIndex=-1,this.$emit("blur",t)},onListKeyDown:function(t){switch(t.code){case"ArrowDown":this.onArrowDownKey(t);break;case"ArrowUp":this.onArrowUpKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"Enter":case"NumpadEnter":this.onEnterKey(t);break;case"Space":this.onSpaceKey(t);break;case"Escape":this.popup&&(ot(this.target),this.hide());case"Tab":this.overlayVisible&&this.hide();break}},onArrowDownKey:function(t){var n=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(n),t.preventDefault()},onArrowUpKey:function(t){if(t.altKey&&this.popup)ot(this.target),this.hide(),t.preventDefault();else{var n=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(n),t.preventDefault()}},onHomeKey:function(t){this.changeFocusedOptionIndex(0),t.preventDefault()},onEndKey:function(t){this.changeFocusedOptionIndex(it(this.container,'li[data-pc-section="item"][data-p-disabled="false"]').length-1),t.preventDefault()},onEnterKey:function(t){var n=ft(this.list,'li[id="'.concat("".concat(this.focusedOptionIndex),'"]')),o=n&&ft(n,'a[data-pc-section="itemlink"]');this.popup&&ot(this.target),o?o.click():n&&n.click(),t.preventDefault()},onSpaceKey:function(t){this.onEnterKey(t)},findNextOptionIndex:function(t){var n=it(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),o=Lt(n).findIndex(function(r){return r.id===t});return o>-1?o+1:0},findPrevOptionIndex:function(t){var n=it(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),o=Lt(n).findIndex(function(r){return r.id===t});return o>-1?o-1:0},changeFocusedOptionIndex:function(t){var n=it(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),o=t>=n.length?n.length-1:t<0?0:t;o>-1&&(this.focusedOptionIndex=n[o].getAttribute("id"))},toggle:function(t,n){this.overlayVisible?this.hide():this.show(t,n)},show:function(t,n){this.overlayVisible=!0,this.target=n??t.currentTarget},hide:function(){this.overlayVisible=!1,this.target=null},onEnter:function(t){pe(t,{position:"absolute",top:"0"}),this.alignOverlay(),this.bindOutsideClickListener(),this.bindResizeListener(),this.bindScrollListener(),this.autoZIndex&&pt.set("menu",t,this.baseZIndex||this.$primevue.config.zIndex.menu),this.popup&&ot(this.list),this.$emit("show")},onLeave:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindScrollListener(),this.$emit("hide")},onAfterLeave:function(t){this.autoZIndex&&pt.clear(t)},alignOverlay:function(){ce(this.container,this.target);var t=at(this.target);t>at(this.container)&&(this.container.style.minWidth=at(this.target)+"px")},bindOutsideClickListener:function(){var t=this;this.outsideClickListener||(this.outsideClickListener=function(n){var o=t.container&&!t.container.contains(n.target),r=!(t.target&&(t.target===n.target||t.target.contains(n.target)));t.overlayVisible&&o&&r?t.hide():!t.popup&&o&&r&&(t.focusedOptionIndex=-1)},document.addEventListener("click",this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener,!0),this.outsideClickListener=null)},bindScrollListener:function(){var t=this;this.scrollHandler||(this.scrollHandler=new ue(this.target,function(){t.overlayVisible&&t.hide()})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var t=this;this.resizeListener||(this.resizeListener=function(){t.overlayVisible&&!de()&&t.hide()},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},visible:function(t){return typeof t.visible=="function"?t.visible():t.visible!==!1},disabled:function(t){return typeof t.disabled=="function"?t.disabled():t.disabled},label:function(t){return typeof t.label=="function"?t.label():t.label},onOverlayClick:function(t){Zn.emit("overlay-click",{originalEvent:t,target:this.target})},containerRef:function(t){this.container=t},listRef:function(t){this.list=t}},computed:{focusedOptionId:function(){return this.focusedOptionIndex!==-1?this.focusedOptionIndex:null},dataP:function(){return L({popup:this.popup})}},components:{PVMenuitem:qt,Portal:Ht}},po=["id","data-p"],bo=["id","tabindex","aria-activedescendant","aria-label","aria-labelledby"],mo=["id"];function fo(e,t,n,o,r,i){var d=G("PVMenuitem"),s=G("Portal");return u(),T(s,{appendTo:e.appendTo,disabled:!e.popup},{default:O(function(){return[v(be,f({name:"p-anchored-overlay",onEnter:i.onEnter,onLeave:i.onLeave,onAfterLeave:i.onAfterLeave},e.ptm("transition")),{default:O(function(){return[!e.popup||r.overlayVisible?(u(),b("div",f({key:0,ref:i.containerRef,id:e.$id,class:e.cx("root"),onClick:t[3]||(t[3]=function(){return i.onOverlayClick&&i.onOverlayClick.apply(i,arguments)}),"data-p":i.dataP},e.ptmi("root")),[e.$slots.start?(u(),b("div",f({key:0,class:e.cx("start")},e.ptm("start")),[P(e.$slots,"start")],16)):k("",!0),c("ul",f({ref:i.listRef,id:e.$id+"_list",class:e.cx("list"),role:"menu",tabindex:e.tabindex,"aria-activedescendant":r.focused?i.focusedOptionId:void 0,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,onFocus:t[0]||(t[0]=function(){return i.onListFocus&&i.onListFocus.apply(i,arguments)}),onBlur:t[1]||(t[1]=function(){return i.onListBlur&&i.onListBlur.apply(i,arguments)}),onKeydown:t[2]||(t[2]=function(){return i.onListKeyDown&&i.onListKeyDown.apply(i,arguments)})},e.ptm("list")),[(u(!0),b(C,null,D(e.model,function(a,l){return u(),b(C,{key:i.label(a)+l.toString()},[a.items&&i.visible(a)&&!a.separator?(u(),b(C,{key:0},[a.items?(u(),b("li",f({key:0,id:e.$id+"_"+l,class:[e.cx("submenuLabel"),a.class],role:"none"},{ref_for:!0},e.ptm("submenuLabel")),[P(e.$slots,e.$slots.submenulabel?"submenulabel":"submenuheader",{item:a},function(){return[I($(i.label(a)),1)]})],16,mo)):k("",!0),(u(!0),b(C,null,D(a.items,function(p,h){return u(),b(C,{key:p.label+l+"_"+h},[i.visible(p)&&!p.separator?(u(),T(d,{key:0,id:e.$id+"_"+l+"_"+h,item:p,templates:e.$slots,focusedOptionId:i.focusedOptionId,unstyled:e.unstyled,onItemClick:i.itemClick,onItemMousemove:i.itemMouseMove,pt:e.pt},null,8,["id","item","templates","focusedOptionId","unstyled","onItemClick","onItemMousemove","pt"])):i.visible(p)&&p.separator?(u(),b("li",f({key:"separator"+l+h,class:[e.cx("separator"),a.class],style:p.style,role:"separator"},{ref_for:!0},e.ptm("separator")),null,16)):k("",!0)],64)}),128))],64)):i.visible(a)&&a.separator?(u(),b("li",f({key:"separator"+l.toString(),class:[e.cx("separator"),a.class],style:a.style,role:"separator"},{ref_for:!0},e.ptm("separator")),null,16)):(u(),T(d,{key:i.label(a)+l.toString(),id:e.$id+"_"+l,item:a,index:l,templates:e.$slots,focusedOptionId:i.focusedOptionId,unstyled:e.unstyled,onItemClick:i.itemClick,onItemMousemove:i.itemMouseMove,pt:e.pt},null,8,["id","item","index","templates","focusedOptionId","unstyled","onItemClick","onItemMousemove","pt"]))],64)}),128))],16,bo),e.$slots.end?(u(),b("div",f({key:1,class:e.cx("end")},e.ptm("end")),[P(e.$slots,"end")],16)):k("",!0)],16,po)):k("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo","disabled"])}St.render=fo;const ho={class:"flex h-14 shrink-0 items-center gap-3 border-b border-obsidian-500/60 bg-obsidian-900/80 px-3 backdrop-blur-md sm:h-16 sm:px-5"},go={class:"lg:hidden"},vo={key:0,class:"truncate font-display text-base font-bold text-ivory sm:hidden"},yo={class:"ml-auto flex items-center gap-1 sm:ml-0"},xo={class:"grid h-8 w-8 shrink-0 place-items-center rounded-md bg-gradient-to-br from-emerald-500 to-gold-500 text-sm font-bold text-obsidian-950"},ko={class:"hidden leading-tight md:block"},$o={class:"block text-xs font-semibold text-ivory"},So={class:"block text-[10px] text-gold-400"},wo=F({__name:"AppTopbar",props:{title:{}},setup(e){const t=me(),n=Mt(),o=rt.name.split(" ").map(i=>i[0]).join(""),r=[{label:`Signed in as ${rt.name}`,disabled:!0},{separator:!0},{label:"Profile",icon:"pi pi-user"},{label:"Settings",icon:"pi pi-cog",command:()=>t.push("/settings")},{label:"Upgrade plan",icon:"pi pi-star"},{separator:!0},{label:"Sign out",icon:"pi pi-sign-out"}];return(i,d)=>{const s=$t("tooltip");return u(),b("header",ho,[c("div",go,[v(st,{variant:"mark",size:26})]),e.title?(u(),b("h1",vo,$(e.title),1)):k("",!0),v(x(Vt),{class:"mx-auto hidden w-full max-w-md sm:block"},{default:O(()=>[v(x(Kt),{class:"pi pi-search"}),v(x(Ut),{placeholder:"Search markets, stocks, ETFs, currencies...",class:"w-full",size:"small"})]),_:1}),c("div",yo,[q(v(x(X),{icon:"pi pi-search",text:"",rounded:"",severity:"secondary",class:"sm:hidden"},null,512),[[s,"Search",void 0,{bottom:!0}]]),d[2]||(d[2]=Ft('<div class="mr-2 hidden items-center gap-2 lg:flex"><span class="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/70"></span><div class="leading-tight"><div class="text-xs font-semibold text-ivory">Market Open</div><div class="nums text-[10px] text-platinum-400">09:45:32 EAT</div></div></div>',1)),q(v(x(X),{icon:"pi pi-bell",text:"",rounded:"",severity:"secondary"},null,512),[[s,"Notifications",void 0,{bottom:!0}]]),q(v(x(X),{icon:"pi pi-envelope",text:"",rounded:"",severity:"secondary",class:"hidden sm:inline-flex"},null,512),[[s,"Messages",void 0,{bottom:!0}]]),c("button",{type:"button",class:"ml-1 flex items-center gap-2 rounded-lg border border-obsidian-500/60 bg-obsidian-800 py-1 pl-1 pr-1 hover:border-obsidian-400 sm:pr-2",onClick:d[0]||(d[0]=a=>n.value.toggle(a))},[c("span",xo,$(x(o)),1),c("span",ko,[c("span",$o,$(x(rt).name),1),c("span",So,$(x(rt).tier),1)]),d[1]||(d[1]=c("i",{class:"pi pi-chevron-down hidden text-xs text-platinum-400 md:block"},null,-1))]),v(x(St),{ref_key:"menu",ref:n,model:r,popup:""},null,512)])])}}}),Po={key:0,class:"text-[0.7em] leading-none"},Ao=F({__name:"PriceChange",props:{value:{},percent:{type:Boolean,default:!1},arrow:{type:Boolean,default:!0},decimals:{default:2}},setup(e){const t=e,n=At(()=>t.value>=0),o=At(()=>Math.abs(t.value).toFixed(t.decimals));return(r,i)=>(u(),b("span",{class:E(["nums inline-flex items-center gap-1 font-medium",n.value?"text-up":"text-down"])},[e.arrow?(u(),b("span",Po,$(n.value?"▲":"▼"),1)):k("",!0),I(" "+$(n.value?"+":"−")+$(o.value),1),e.percent?(u(),b(C,{key:1},[I("%")],64)):k("",!0)],2))}}),Io={class:"hidden h-12 shrink-0 items-center gap-5 border-t border-obsidian-500/60 bg-obsidian-850 px-5 lg:flex"},_o={class:"flex shrink-0 items-center gap-2"},Co={class:"flex flex-1 items-center gap-6 overflow-x-auto"},Eo={class:"font-semibold text-platinum-300"},To={class:"nums text-ivory"},Oo=F({__name:"TickerBar",setup(e){return(t,n)=>(u(),b("footer",Io,[c("div",_o,[v(st,{variant:"mark",size:20}),n[0]||(n[0]=c("span",{class:"hidden text-[10px] font-medium uppercase tracking-[0.18em] text-platinum-400 xl:inline"},[I(" African Markets. African Value. "),c("span",{class:"text-emerald-400"},"African Future.")],-1))]),c("div",Co,[(u(!0),b(C,null,D(x(xn),o=>(u(),b("div",{key:o.label,class:"flex shrink-0 items-center gap-2 text-xs"},[c("span",Eo,$(o.label),1),c("span",To,$(o.value),1),v(Ao,{value:o.change,percent:"",class:"text-[11px]"},null,8,["value"])]))),128))]),n[1]||(n[1]=c("button",{type:"button",class:"flex shrink-0 items-center gap-1.5 rounded-lg border border-obsidian-500/60 px-3 py-1.5 text-xs text-platinum-300 hover:border-obsidian-400 hover:text-ivory"},[c("i",{class:"pi pi-cog"}),I(" Customize Dashboard ")],-1))]))}}),Lo={class:"relative z-20 flex h-16 shrink-0 items-stretch border-t border-obsidian-500/60 bg-obsidian-850 pb-[env(safe-area-inset-bottom)] lg:hidden"},No={class:"relative flex w-1/5 items-start justify-center"},Fo=F({__name:"BottomNav",setup(e){const t=Nt(),n=Mt(),o=[{label:"Home",icon:"pi pi-objects-column",to:"/",match:"Dashboard"},{label:"Markets",icon:"pi pi-chart-line",to:"/markets",match:"Markets"}],r=[{label:"Portfolio",icon:"pi pi-briefcase",to:"/portfolio",match:"Portfolio"}],i=[{label:"Watchlist",icon:"pi pi-eye",route:"/watchlist"},{label:"Orders",icon:"pi pi-receipt",route:"/orders"},{label:"Analytics",icon:"pi pi-chart-bar",route:"/analytics"},{label:"News & Insights",icon:"pi pi-megaphone",route:"/news"},{label:"AFX Explore",icon:"pi pi-compass",route:"/explore"},{label:"Settings",icon:"pi pi-cog",route:"/settings"}];return(d,s)=>{const a=G("RouterLink");return u(),b("nav",Lo,[(u(),b(C,null,D(o,l=>v(a,{key:l.label,to:l.to,class:E(["flex w-1/5 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors",x(t).name===l.match?"text-emerald-300":"text-platinum-400"])},{default:O(()=>[c("i",{class:E(l.icon),style:{"font-size":"1.25rem"}},null,2),c("span",null,$(l.label),1)]),_:2},1032,["to","class"])),64)),c("div",No,[v(a,{to:"/trade","aria-label":"Trade",class:"absolute -top-5 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-obsidian-950 shadow-lg shadow-emerald-900/50 ring-4 ring-obsidian-850 active:bg-emerald-400"},{default:O(()=>[...s[1]||(s[1]=[c("i",{class:"pi pi-arrow-right-arrow-left",style:{"font-size":"1.4rem"}},null,-1)])]),_:1}),s[2]||(s[2]=c("span",{class:"mt-9 text-[10px] font-medium text-platinum-400"},"Trade",-1))]),(u(),b(C,null,D(r,l=>v(a,{key:l.label,to:l.to,class:E(["flex w-1/5 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors",x(t).name===l.match?"text-emerald-300":"text-platinum-400"])},{default:O(()=>[c("i",{class:E(l.icon),style:{"font-size":"1.25rem"}},null,2),c("span",null,$(l.label),1)]),_:2},1032,["to","class"])),64)),c("button",{type:"button",class:"flex w-1/5 flex-col items-center justify-center gap-1 text-[10px] font-medium text-platinum-400",onClick:s[0]||(s[0]=l=>n.value.toggle(l))},[...s[3]||(s[3]=[c("i",{class:"pi pi-bars",style:{"font-size":"1.25rem"}},null,-1),c("span",null,"More",-1)])]),v(x(St),{ref_key:"menu",ref:n,popup:"",model:i.map(l=>({label:l.label,icon:l.icon,command:()=>d.$router.push(l.route)}))},null,8,["model"])])}}}),Mo={class:"flex h-[100dvh] overflow-hidden bg-obsidian-900 text-ivory"},Bo={class:"flex min-w-0 flex-1 flex-col"},zo={class:"flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8"},ci=F({__name:"AppShell",props:{title:{}},setup(e){return(t,n)=>(u(),b("div",Mo,[v(_n),c("div",Bo,[v(wo,{title:e.title},null,8,["title"]),c("main",zo,[P(t.$slots,"default")]),v(Oo),v(Fo)])]))}});export{Ko as A,Ht as B,Uo as C,Gt as D,Jo as E,Qo as F,jo as I,qo as M,kn as N,oi as O,ii as P,Wo as R,ai as S,Ho as T,rt as U,Vo as W,ci as _,Go as a,ri as b,Yo as c,ui as d,di as e,Do as f,Xo as g,si as h,li as i,Zn as j,Zo as k,ni as l,ei as m,Dt as n,ti as o,Ao as p,L as q,N as r,X as s,Vt as t,Kt as u,Ut as v,zn as w,Ae as x,Rn as y,jt as z};
