import{w as V,q as S,U as F,_ as j,v as y,s as v}from"./AppShell.vue_vue_type_script_setup_true_lang-DhLJwdL4.js";import{a as p,b as h,c as m,s as T}from"./index-C1f5Khal.js";import{s as x}from"./index-DPKOjOi4.js";import{c as B,aj as k,a0 as U,E as t,af as w,ap as P,a5 as C,an as g,X as O,aF as r,a4 as s,ay as i,a3 as b}from"./index--PsOHA0F.js";import"./index-C2pj0GYm.js";import"./index-J5juV234.js";var A=`
    .p-toggleswitch {
        display: inline-block;
        width: dt('toggleswitch.width');
        height: dt('toggleswitch.height');
    }

    .p-toggleswitch-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border-radius: dt('toggleswitch.border.radius');
    }

    .p-toggleswitch-slider {
        cursor: pointer;
        width: 100%;
        height: 100%;
        border-width: dt('toggleswitch.border.width');
        border-style: solid;
        border-color: dt('toggleswitch.border.color');
        background: dt('toggleswitch.background');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            border-color dt('toggleswitch.transition.duration'),
            outline-color dt('toggleswitch.transition.duration'),
            box-shadow dt('toggleswitch.transition.duration');
        border-radius: dt('toggleswitch.border.radius');
        outline-color: transparent;
        box-shadow: dt('toggleswitch.shadow');
    }

    .p-toggleswitch-handle {
        position: absolute;
        top: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: dt('toggleswitch.handle.background');
        color: dt('toggleswitch.handle.color');
        width: dt('toggleswitch.handle.size');
        height: dt('toggleswitch.handle.size');
        inset-inline-start: dt('toggleswitch.gap');
        margin-block-start: calc(-1 * calc(dt('toggleswitch.handle.size') / 2));
        border-radius: dt('toggleswitch.handle.border.radius');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            inset-inline-start dt('toggleswitch.slide.duration'),
            box-shadow dt('toggleswitch.slide.duration');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.background');
        border-color: dt('toggleswitch.checked.border.color');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.background');
        color: dt('toggleswitch.handle.checked.color');
        inset-inline-start: calc(dt('toggleswitch.width') - calc(dt('toggleswitch.handle.size') + dt('toggleswitch.gap')));
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
        background: dt('toggleswitch.hover.background');
        border-color: dt('toggleswitch.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.hover.background');
        color: dt('toggleswitch.handle.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.hover.background');
        border-color: dt('toggleswitch.checked.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.hover.background');
        color: dt('toggleswitch.handle.checked.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
        box-shadow: dt('toggleswitch.focus.ring.shadow');
        outline: dt('toggleswitch.focus.ring.width') dt('toggleswitch.focus.ring.style') dt('toggleswitch.focus.ring.color');
        outline-offset: dt('toggleswitch.focus.ring.offset');
    }

    .p-toggleswitch.p-invalid > .p-toggleswitch-slider {
        border-color: dt('toggleswitch.invalid.border.color');
    }

    .p-toggleswitch.p-disabled {
        opacity: 1;
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-slider {
        background: dt('toggleswitch.disabled.background');
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.disabled.background');
    }
`,$={root:{position:"relative"}},z={root:function(a){var d=a.instance,c=a.props;return["p-toggleswitch p-component",{"p-toggleswitch-checked":d.checked,"p-disabled":c.disabled,"p-invalid":d.$invalid}]},input:"p-toggleswitch-input",slider:"p-toggleswitch-slider",handle:"p-toggleswitch-handle"},D=B.extend({name:"toggleswitch",style:A,classes:z,inlineStyles:$}),E={name:"BaseToggleSwitch",extends:V,props:{trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:D,provide:function(){return{$pcToggleSwitch:this,$parentInstance:this}}},u={name:"ToggleSwitch",extends:E,inheritAttrs:!1,emits:["change","focus","blur"],methods:{getPTOptions:function(a){var d=a==="root"?this.ptmi:this.ptm;return d(a,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(a){if(!this.disabled&&!this.readonly){var d=this.checked?this.falseValue:this.trueValue;this.writeValue(d,a),this.$emit("change",a)}},onFocus:function(a){this.$emit("focus",a)},onBlur:function(a){var d,c;this.$emit("blur",a),(d=(c=this.formField).onBlur)===null||d===void 0||d.call(c,a)}},computed:{checked:function(){return this.d_value===this.trueValue},dataP:function(){return S({checked:this.checked,disabled:this.disabled,invalid:this.$invalid})}}},N=["data-p-checked","data-p-disabled","data-p"],I=["id","checked","tabindex","disabled","readonly","aria-checked","aria-labelledby","aria-label","aria-invalid"],R=["data-p"],L=["data-p"];function X(n,a,d,c,f,l){return k(),U("div",w({class:n.cx("root"),style:n.sx("root")},l.getPTOptions("root"),{"data-p-checked":l.checked,"data-p-disabled":n.disabled,"data-p":l.dataP}),[t("input",w({id:n.inputId,type:"checkbox",role:"switch",class:[n.cx("input"),n.inputClass],style:n.inputStyle,checked:l.checked,tabindex:n.tabindex,disabled:n.disabled,readonly:n.readonly,"aria-checked":l.checked,"aria-labelledby":n.ariaLabelledby,"aria-label":n.ariaLabel,"aria-invalid":n.invalid||void 0,onFocus:a[0]||(a[0]=function(){return l.onFocus&&l.onFocus.apply(l,arguments)}),onBlur:a[1]||(a[1]=function(){return l.onBlur&&l.onBlur.apply(l,arguments)}),onChange:a[2]||(a[2]=function(){return l.onChange&&l.onChange.apply(l,arguments)})},l.getPTOptions("input")),null,16,I),t("div",w({class:n.cx("slider")},l.getPTOptions("slider"),{"data-p":l.dataP}),[t("div",w({class:n.cx("handle")},l.getPTOptions("handle"),{"data-p":l.dataP}),[P(n.$slots,"handle",{checked:l.checked})],16,L)],16,R)],16,N)}u.render=X;const q={class:"mx-auto max-w-3xl"},K={class:"space-y-4 pt-2"},M={class:"flex items-center justify-between gap-4"},Q={class:"flex items-center justify-between gap-4"},G={class:"flex items-center justify-between gap-4"},Z={class:"space-y-4 pt-2"},H={class:"flex items-center justify-between gap-4"},J={class:"flex items-center justify-between gap-4"},W={class:"flex items-center justify-between gap-4"},Y={class:"space-y-4 pt-2"},_={class:"flex items-center justify-between gap-4"},ee={class:"flex items-center justify-between gap-4"},te={class:"flex items-center justify-between gap-4"},le={class:"flex items-center justify-between gap-4"},se={class:"space-y-4 pt-2"},ie={class:"flex items-center justify-between gap-4"},ne={class:"flex items-center justify-between gap-4"},ae={class:"flex items-center justify-between gap-4"},oe={class:"mt-5 flex justify-end gap-3"},me=C({__name:"SettingsView",setup(n){const a=g(F.name),d=g("amara@afriqx.africa"),c=g("KES"),f=g("AFRIQX Dark"),l=g({twoFa:!0,biometric:!0,priceAlerts:!0,orderFills:!0,newsDigest:!1,aiSummary:!0,compactTables:!0,ticker:!0});return(de,e)=>(k(),O(j,{title:"Settings"},{default:r(()=>[t("div",q,[e[29]||(e[29]=t("div",{class:"mb-6"},[t("h1",{class:"font-display text-xl font-bold text-ivory sm:text-2xl"},"Settings"),t("p",{class:"text-sm text-platinum-400"},"Manage your profile, security and preferences.")],-1)),s(i(T),{value:"0"},{default:r(()=>[s(i(p),{value:"0"},{default:r(()=>[s(i(h),null,{default:r(()=>[...e[12]||(e[12]=[b("Profile",-1)])]),_:1}),s(i(m),null,{default:r(()=>[t("div",K,[t("div",M,[e[13]||(e[13]=t("span",{class:"text-sm font-medium text-ivory"},"Full name",-1)),s(i(y),{modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=o=>a.value=o),size:"small",class:"w-52"},null,8,["modelValue"])]),t("div",Q,[e[14]||(e[14]=t("span",{class:"text-sm font-medium text-ivory"},"Email",-1)),s(i(y),{modelValue:d.value,"onUpdate:modelValue":e[1]||(e[1]=o=>d.value=o),size:"small",class:"w-60"},null,8,["modelValue"])]),t("div",G,[e[15]||(e[15]=t("span",{class:"text-sm font-medium text-ivory"},"Base currency",-1)),s(i(x),{modelValue:c.value,"onUpdate:modelValue":e[2]||(e[2]=o=>c.value=o),options:["KES","NGN","ZAR","USD"],class:"w-32"},null,8,["modelValue"])])])]),_:1})]),_:1}),s(i(p),{value:"1"},{default:r(()=>[s(i(h),null,{default:r(()=>[...e[16]||(e[16]=[b("Security",-1)])]),_:1}),s(i(m),null,{default:r(()=>[t("div",Z,[t("div",H,[e[17]||(e[17]=t("div",null,[t("div",{class:"text-sm font-medium text-ivory"},"Two-factor authentication"),t("div",{class:"text-xs text-platinum-400"},"Recommended")],-1)),s(i(u),{modelValue:l.value.twoFa,"onUpdate:modelValue":e[3]||(e[3]=o=>l.value.twoFa=o)},null,8,["modelValue"])]),t("div",J,[e[18]||(e[18]=t("div",null,[t("div",{class:"text-sm font-medium text-ivory"},"Biometric login"),t("div",{class:"text-xs text-platinum-400"},"Face / fingerprint on mobile")],-1)),s(i(u),{modelValue:l.value.biometric,"onUpdate:modelValue":e[4]||(e[4]=o=>l.value.biometric=o)},null,8,["modelValue"])]),t("div",W,[e[19]||(e[19]=t("span",{class:"text-sm font-medium text-ivory"},"Change password",-1)),s(i(v),{label:"Update",size:"small",severity:"secondary",outlined:""})])])]),_:1})]),_:1}),s(i(p),{value:"2"},{default:r(()=>[s(i(h),null,{default:r(()=>[...e[20]||(e[20]=[b("Notifications",-1)])]),_:1}),s(i(m),null,{default:r(()=>[t("div",Y,[t("div",_,[e[21]||(e[21]=t("span",{class:"text-sm font-medium text-ivory"},"Price alerts",-1)),s(i(u),{modelValue:l.value.priceAlerts,"onUpdate:modelValue":e[5]||(e[5]=o=>l.value.priceAlerts=o)},null,8,["modelValue"])]),t("div",ee,[e[22]||(e[22]=t("span",{class:"text-sm font-medium text-ivory"},"Order fills",-1)),s(i(u),{modelValue:l.value.orderFills,"onUpdate:modelValue":e[6]||(e[6]=o=>l.value.orderFills=o)},null,8,["modelValue"])]),t("div",te,[e[23]||(e[23]=t("div",null,[t("div",{class:"text-sm font-medium text-ivory"},"Market news digest"),t("div",{class:"text-xs text-platinum-400"},"Daily at 08:00 EAT")],-1)),s(i(u),{modelValue:l.value.newsDigest,"onUpdate:modelValue":e[7]||(e[7]=o=>l.value.newsDigest=o)},null,8,["modelValue"])]),t("div",le,[e[24]||(e[24]=t("span",{class:"text-sm font-medium text-ivory"},"AI market summaries",-1)),s(i(u),{modelValue:l.value.aiSummary,"onUpdate:modelValue":e[8]||(e[8]=o=>l.value.aiSummary=o)},null,8,["modelValue"])])])]),_:1})]),_:1}),s(i(p),{value:"3"},{default:r(()=>[s(i(h),null,{default:r(()=>[...e[25]||(e[25]=[b("Preferences",-1)])]),_:1}),s(i(m),null,{default:r(()=>[t("div",se,[t("div",ie,[e[26]||(e[26]=t("span",{class:"text-sm font-medium text-ivory"},"Theme",-1)),s(i(x),{modelValue:f.value,"onUpdate:modelValue":e[9]||(e[9]=o=>f.value=o),options:["AFRIQX Dark","Obsidian"],class:"w-40"},null,8,["modelValue"])]),t("div",ne,[e[27]||(e[27]=t("span",{class:"text-sm font-medium text-ivory"},"Compact data tables",-1)),s(i(u),{modelValue:l.value.compactTables,"onUpdate:modelValue":e[10]||(e[10]=o=>l.value.compactTables=o)},null,8,["modelValue"])]),t("div",ae,[e[28]||(e[28]=t("span",{class:"text-sm font-medium text-ivory"},"Show ticker bar",-1)),s(i(u),{modelValue:l.value.ticker,"onUpdate:modelValue":e[11]||(e[11]=o=>l.value.ticker=o)},null,8,["modelValue"])])])]),_:1})]),_:1})]),_:1}),t("div",oe,[s(i(v),{label:"Cancel",text:"",severity:"secondary"}),s(i(v),{label:"Save changes",class:"font-display font-semibold"})])])]),_:1}))}});export{me as default};
