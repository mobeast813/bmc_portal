"use strict";(self.webpackChunkbmc_management_portal=self.webpackChunkbmc_management_portal||[]).push([[880],{5407:(e,s,t)=>{t.d(s,{FV:()=>a,St:()=>n,Wh:()=>o,em:()=>c,n$:()=>r});var l=t(8775);const c=async e=>{const{userId:s,page:t}=e;try{return(await l.A.get(`/bmc/inventory/${s}/${t}`,{headers:(0,l.w)()})).data}catch(c){console.error("Error fetching data:",c)}},a=async e=>{const{userId:s,vendor:t,boa:c,page:a}=e;try{return(await l.A.get(`/bmc/inventory/${s}/${t}/${c}/${a}`,{headers:(0,l.w)()})).data}catch(r){console.error("Error fetching data:",r)}},r=async e=>{const{bmcUUID:s}=e;try{return(await l.A.get(`/bmc/inventory/detail/${s}`,{headers:(0,l.w)()})).data}catch(t){console.error("Error fetching data:",t)}},o=async e=>{const{powerOption:s,bmcUUID:t,bmcIp:l}=e;try{const e={power_option:s,bmc_UUID:t,bmc_ip:l};return console.log(e),!0}catch(c){console.error("Error fetching data:",c)}},n=async e=>{const{fanOption:s,bmcUUID:t,bmcIp:l}=e;try{const e={fan_option:s,bmc_UUID:t,bmc_ip:l};return console.log(e),!0}catch(c){console.error("Error fetching data:",c)}}},880:(e,s,t)=>{t.r(s),t.d(s,{default:()=>P});var l=t(5043),c=t(4101),a=t(861),r=t(6105),o=t(4907),n=t(4227),i=(t(5015),t(1559)),d=t(7476),m=t(357),h=t(4549),x=t(5074),b=t(5475),j=t(9580),p=t(4303),u=t(7861),g=t(6528),y=t(3805),v=t(2845),U=t(2657),f=t(2558),A=t(579);const I=e=>{let{list:s,selectId:t,unselectId:c,selectAll:a,unselectAll:r,resetCheckbox:o}=e;const[n,i]=(0,l.useState)(),[d,m]=(0,l.useState)(!1),[h,x]=(0,l.useState)({}),[I,C]=(0,l.useState)(!1),[w,_]=(0,l.useState)();(0,l.useEffect)((()=>{m(!1),n&&n.forEach((e=>{h[e.bmcUUID]=!1})),r()}),[o]);(0,l.useEffect)((()=>{if(0===Object.keys(h).length)return;const e=Object.values(h).every((e=>e));m(!!e)}),[h]),(0,l.useEffect)((()=>{if(s){const e=s.map((e=>({check:"",bmcUUID:e.bmc_UUID,bmcName:e.bmc_name,boaName:e.boa_name,vendor:e.vendor,bmcIp:e.bmc_ip,version:e.version,joinState:e.join_state,joinDate:e.join_date,_cellProps:{class:{scope:"row"}}})));i(e)}}),[s]);const S=[{key:"check",label:"\uc120\ud0dd",_props:{scope:"col"}},{key:"bmc_UUID",label:"\uc11c\ubc84ID",_props:{scope:"col"}},{key:"bmc_name",label:"\uc11c\ubc84\uba85",_props:{scope:"col"}},{key:"boa_name",label:"\uadf8\ub8f9",_props:{scope:"col"}},{key:"vendor",label:"\ubca4\ub354",_props:{scope:"col"}},{key:"bmc_ip",label:"IP",_props:{scope:"col"}},{key:"version",label:"\ubc84\uc804",_props:{scope:"col"}},{key:"join_state",label:"\ub4f1\ub85d\uc0c1\ud0dc",_props:{scope:"col"}},{key:"join_date",label:"\ub4f1\ub85d\uc77c",_props:{scope:"col"}}];return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsxs)(j._,{align:"middle",responsive:!0,bordered:!0,hover:!0,children:[(0,A.jsx)(p.w,{align:"middle",color:"primary",children:(0,A.jsx)(u.Y,{children:null===S||void 0===S?void 0:S.map(((e,s)=>(0,A.jsxs)(g.$,{children:["\uc120\ud0dd"==e.label?(0,A.jsx)(y.C,{checked:d||!1,onChange:e=>{const s=e.target.checked;m(s),s?(n.forEach((e=>{h[e.bmcUUID]=!0})),a()):(n.forEach((e=>{h[e.bmcUUID]=!1})),r())}}):(0,A.jsx)(A.Fragment,{}),"\xa0 ",e.label]},s)))})}),(0,A.jsx)(v.C,{align:"middle",children:null===n||void 0===n?void 0:n.map(((e,s)=>(0,A.jsxs)(u.Y,{children:[(0,A.jsx)(U.c,{children:(0,A.jsx)(y.C,{type:"checkbox",id:`gridCheck-${e.bmcUUID}`,checked:h[e.bmcUUID]||!1,onChange:s=>{const l=s.target.checked;((e,s)=>{x((t=>({...t,[e]:s})))})(e.bmcUUID,l),l?t(e.bmcUUID):c(e.bmcUUID)}})}),(0,A.jsx)(U.c,{children:(0,A.jsx)(b.N_,{onClick:()=>{return s=e.bmcUUID,_(s),void C(!0);var s},children:e.bmcUUID})}),(0,A.jsx)(U.c,{children:e.bmcName}),(0,A.jsx)(U.c,{children:e.boaName}),(0,A.jsx)(U.c,{children:e.vendor}),(0,A.jsx)(U.c,{children:e.bmcIp}),(0,A.jsx)(U.c,{children:e.version}),(0,A.jsx)(U.c,{children:e.joinState}),(0,A.jsx)(U.c,{children:e.joinDate})]},s)))})]}),(0,A.jsx)(f.A,{visible:I,setVisible:C,bmcUUID:w})]})};var C=t(3003),w=t(4398),_=t(1418),S=t(9689),k=t(6323),N=t(1917),D=t(5823),B=t(5968),M=t(6345),E=t(4750),O=t(6477),$=t(713);const V=e=>{const{visible:s,setVisible:t,vendorOptions:a,boaGroupOptions:r,callBack:o}=e,d=(0,C.wA)(),[h,b]=(0,l.useState)(),[j,p]=(0,l.useState)(),[u,g]=(0,l.useState)(),[y,v]=(0,l.useState)(),[U,f]=(0,l.useState)(0),[I,V]=(0,l.useState)(0);var P=`${(new E.A).get("userId")}`;const R=()=>{b(""),p(""),g(""),v(""),t(!1)};return(0,A.jsxs)(w.z,{size:"lg",alignment:"center",visible:s,onClose:()=>{R()},labelledby:"VerticallyCenteredExample",children:[(0,A.jsx)(_.E,{children:(0,A.jsx)(S.l,{id:"VerticallyCenteredExample",children:"BMC \uc11c\ubc84 \ub4f1\ub85d \uc694\uccad"})}),(0,A.jsx)(k.T,{className:"text-center m-3",children:(0,A.jsxs)(N.q,{children:[(0,A.jsx)(c.s,{className:"mb-3",children:(0,A.jsx)(M.A,{title:"BMC Name",setOnChange:b})}),(0,A.jsx)(c.s,{className:"mb-3",children:(0,A.jsx)(M.A,{title:"BMC IP",setOnChange:p})}),(0,A.jsx)(c.s,{className:"mb-3",children:(0,A.jsx)(M.A,{title:"BMC User",setOnChange:g})}),(0,A.jsx)(c.s,{className:"mb-3",children:(0,A.jsx)(M.A,{title:"BMC Password",setOnChange:v})}),(0,A.jsxs)(c.s,{className:"mb-3",children:[(0,A.jsxs)(n.U,{sm:6,className:"d-flex align-items-center",children:[(0,A.jsx)(D.A,{className:"col-form-label col-6 me-2",children:"Vendor"}),(0,A.jsx)(m.A,{options:(0,x.YA)(a,"\uc120\ud0dd"),callBack:e=>f(e)})]}),(0,A.jsxs)(n.U,{sm:6,className:"d-flex align-items-center",children:[(0,A.jsx)(D.A,{className:"col-form-label col-6 me-2",children:"BOA Group"}),(0,A.jsx)(m.A,{options:(0,x.YA)(r,"\uc120\ud0dd"),callBack:e=>V(e)})]})]})]})}),(0,A.jsx)(B.I,{children:(0,A.jsxs)("div",{className:"d-flex col-6 mx-auto",children:[(0,A.jsx)(n.U,{className:"me-2 col-6",children:(0,A.jsx)(O.A,{text:"\ub4f1\ub85d \uc694\uccad",onClick:()=>{[h,j,u,y,U,I].every((e=>e))?(0,i.Lv)({userId:P,bmcName:h,bmcIP:j,bmcUser:u,bmcPassword:y,bmcPassword:y,vendor:U,boaGroup:I}).then((async e=>{e?(d({type:"modal",showAlertModal:{isShow:!0,title:"\uc11c\ubc84 \ub4f1\ub85d \uc644\ub8cc",msg:"BMC\uc11c\ubc84 \ub4f1\ub85d\uc744 \uc644\ub8cc\ud558\uc600\uc2b5\ub2c8\ub2e4."}}),o()):d({type:"modal",showAlertModal:{isShow:!0,title:"\u26a0\ufe0f \uc54c\ub9bc",msg:"\uc11c\ubc84 \ub4f1\ub85d\uc5d0 \uc2e4\ud328\ud558\uc600\uc2b5\ub2c8\ub2e4."}}),t(!1)})).catch((e=>{d({type:"modal",showAlertModal:{isShow:!0,title:"\u26a0\ufe0f \uc5d0\ub7ec",msg:"BMC\uc11c\ubc84\ub4f1\ub85d\uc5d0 \ubb38\uc81c\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ud655\uc778\ud574\uc8fc\uc138\uc694"}})})):d({type:"modal",showAlertModal:{isShow:!0,title:"\u26a0\ufe0f \uc54c\ub9bc",msg:"\ud56d\ubaa9\uc744 \ubaa8\ub450 \uc791\uc131\ud574 \uc8fc\uc138\uc694"}})}})}),(0,A.jsx)(n.U,{className:"me-2 col-6",children:(0,A.jsx)($.A,{text:"\ucde8\uc18c",onClick:()=>{R()}})})]})})]})},P=()=>{const[e]=(0,d.lT)(["userId"]);var s=`${e.userId}`;const t=(0,C.wA)(),[b,j]=(0,l.useState)([]),[p,u]=(0,l.useState)(),[g,y]=(0,l.useState)(),[v,U]=(0,l.useState)(!1),[f,w]=(0,l.useState)(["join","unjoin"]),[_,S]=(0,l.useState)([]),[k,N]=(0,l.useState)([]),[D,B]=(0,l.useState)(0),[M,E]=(0,l.useState)(0),[$,P]=(0,l.useState)(0),[R,Y]=(0,l.useState)(!1),[F,q]=(0,l.useState)(!1);(0,l.useEffect)((()=>{z(1)}),[]);const z=e=>{try{return(0,i.qU)({userId:s,page:e}).then((e=>{S(e.vendor),N(e.boa),u(e.bmc),y(e.pages)})).catch((e=>{console.log(e)}))}catch(t){console.error("Error fetching data:",t)}},G=e=>{let{isRefresh:t,page:l}=e;try{return(0,i.qU)({userId:s,page:t?1:l}).then((e=>{u(e.bmc),t&&(Y(!R),U(!v),y(e.pages))}))}catch(c){console.error("Error fetching data:",c)}},T=e=>{let{isRefresh:t,page:l}=e;try{return(0,i.HK)({userId:s,join:D,vendor:M,boaName:$,page:t?1:l}).then((e=>{u(e.bmc),t&&(U(!v),y(e.pages))}))}catch(c){console.error("Error fetching data:",c)}},W=async()=>{try{Y(!R),T({isRefresh:!0,page:1})}catch(e){console.error("Error fetching data:",e)}};return(0,A.jsx)(A.Fragment,{children:(0,A.jsx)(c.s,{className:"d-flex justify-content-center align-item-center",children:(0,A.jsxs)(a.E,{className:"d-flex mb-3",children:[(0,A.jsxs)(r.W,{children:[(0,A.jsx)("div",{className:"d-flex",children:(0,A.jsx)(o.Q,{style:{fontWeight:"bold"},children:"BMC \uc11c\ubc84 \uad00\ub9ac"})}),(0,A.jsxs)(c.s,{className:"justify-content-end mb-4",xs:{cols:"auto"},children:[(0,A.jsx)(m.A,{options:(0,x.YA)(f,"\uc804\uccb4"),callBack:e=>{B(e)}}),(0,A.jsx)(m.A,{options:(0,x.YA)(_,"\uc804\uccb4"),callBack:e=>E(e)}),(0,A.jsx)(m.A,{options:(0,x.YA)(k,"\uc804\uccb4"),callBack:e=>P(e)}),(0,A.jsx)(n.U,{children:(0,A.jsx)(O.A,{text:"\uac80\uc0c9",onClick:async()=>{0===D&&0===M&&0===$?G({isRefresh:!0,page:1}):T({isRefresh:!0,page:1})}})})]}),(0,A.jsx)(c.s,{children:(0,A.jsxs)(n.U,{className:"d-flex justify-content-between",children:[(0,A.jsxs)("div",{className:"d-flex",children:[(0,A.jsx)(h.A,{text:"\ub4f1\ub85d\uc694\uccad",onClick:()=>{q(!0)}}),(0,A.jsx)(h.A,{text:"\uc0ad\uc81c",onClick:async()=>{b.length>0?t({type:"modal",showConfirmModal:{isShow:!0,title:"BMC\uc11c\ubc84 \uc0ad\uc81c \ud655\uc778",msg:`${b.length}\uac1c\uc758 BMC \uc11c\ubc84\ub97c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?`,onConfirm:()=>{(0,i.ZZ)({bmcUUID:b}).then((e=>{e?(t({type:"modal",showAlertModal:{isShow:!0,title:"\uc0ad\uc81c \uc644\ub8cc",msg:"BMC\uc11c\ubc84 \uc0ad\uc81c\ub97c \uc644\ub8cc\ud558\uc600\uc2b5\ub2c8\ub2e4."}}),W()):t({type:"modal",showAlertModal:{isShow:!0,title:"\u26a0\ufe0f \uc54c\ub9bc",msg:"\uc0ad\uc81c\uc5d0 \uc2e4\ud328\ud558\uc600\uc2b5\ub2c8\ub2e4."}})}))}}}):t({type:"modal",showAlertModal:{isShow:!0,title:"BMC\uc11c\ubc84 \uc0ad\uc81c \ud655\uc778",msg:"\uc0ad\uc81c\ud560 \uc11c\ubc84\ub97c \uc120\ud0dd\ud574 \uc8fc\uc138\uc694"}})}})]}),(0,A.jsx)("div",{className:"d-flex",children:(0,A.jsx)(m.A,{options:(0,x.Vl)(g),reload:v,callBack:e=>{0===D&&0===M&&0===$?G({isRefresh:!1,page:e}):T({isRefresh:!1,page:e})}})})]})})]}),(0,A.jsx)(I,{list:p,selectId:e=>{j([...b,e])},unselectId:e=>{j(b.filter((s=>s!==e)))},selectAll:()=>{const e=p.map((e=>e.number));j([...b,...e])},unselectAll:()=>{j([])},resetCheckbox:R}),(0,A.jsx)(V,{visible:F,setVisible:q,vendorOptions:_,boaGroupOptions:k,callBack:W})]})})})}},2558:(e,s,t)=>{t.d(s,{A:()=>b});var l=t(4398),c=t(1418),a=t(9689),r=t(6323),o=t(1917),n=t(4101),i=t(5043),d=t(8e3),m=t(5407),h=t(3003),x=t(579);const b=e=>{const{bmcUUID:s,visible:t,setVisible:b}=e,j=(0,h.wA)(),[p,u]=(0,i.useState)();return(0,i.useEffect)((()=>{t&&(0,m.n$)({bmcUUID:"UUID_1"}).then((async e=>{0===e.inventory_detail.length?(b(!1),j({type:"modal",showAlertModal:{isShow:!0,title:"\u26a0\ufe0f \uc54c\ub9bc",msg:"\uc0c1\uc138 \ub370\uc774\ud130\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."}})):u(e.inventory_detail[0])})).catch((e=>{j({type:"modal",showAlertModal:{isShow:!0,title:"InventoryCatalogDetail Error",msg:"InventoryCatalogDetail\uc5d0 \ubb38\uc81c\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ud655\uc778\ud574\uc8fc\uc138\uc694"}})}))}),[t]),p?(0,x.jsxs)(l.z,{size:"xl",alignment:"center",visible:t,onClose:()=>{b(!1)},labelledby:"VerticallyCenteredExample",children:[(0,x.jsx)(c.E,{children:(0,x.jsx)(a.l,{id:"VerticallyCenteredExample",children:"BMC Inventory Catalog Detail"})}),(0,x.jsx)(r.T,{className:"text-center m-3",children:(0,x.jsxs)(o.q,{children:[(0,x.jsxs)(n.s,{className:"mb-3",children:[(0,x.jsx)(d.A,{title:"System ID",value:s}),(0,x.jsx)(d.A,{title:"Serial Number",value:p.serial_num})]}),(0,x.jsxs)(n.s,{className:"mb-3",children:[(0,x.jsx)(d.A,{title:"Firmware Version",value:p.firmware_version}),(0,x.jsx)(d.A,{title:"Model",value:p.model})]}),(0,x.jsxs)(n.s,{className:"mb-3",children:[(0,x.jsx)(d.A,{title:"BIOS Version",value:p.bios_version}),(0,x.jsx)(d.A,{title:"BMC MAC Address",value:p.mac_address})]}),(0,x.jsxs)(n.s,{className:"mb-3",children:[(0,x.jsx)(d.A,{title:"BIOS Build Time",value:p.bios_build_time}),(0,x.jsx)(d.A,{title:"Power State",value:p.power_status})]})]})})]}):(0,x.jsx)(x.Fragment,{})}}}]);
//# sourceMappingURL=880.1c21afdc.chunk.js.map