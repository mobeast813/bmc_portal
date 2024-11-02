"use strict";(self.webpackChunkbmc_management_portal=self.webpackChunkbmc_management_portal||[]).push([[50],{5407:(e,s,r)=>{r.d(s,{FV:()=>a,St:()=>o,Wh:()=>n,em:()=>l,n$:()=>c});var t=r(8775);const l=async e=>{const{userId:s,page:r}=e;try{return(await t.A.get(`/bmc/inventory/${s}/${r}`,{headers:(0,t.w)()})).data}catch(l){console.error("Error fetching data:",l)}},a=async e=>{const{userId:s,vendor:r,boa:l,page:a}=e;try{return(await t.A.get(`/bmc/inventory/${s}/${r}/${l}/${a}`,{headers:(0,t.w)()})).data}catch(c){console.error("Error fetching data:",c)}},c=async e=>{const{bmcUUID:s}=e;try{return(await t.A.get(`/bmc/inventory/detail/${s}`,{headers:(0,t.w)()})).data}catch(r){console.error("Error fetching data:",r)}},n=async e=>{const{powerOption:s,bmcUUID:r,bmcIp:t}=e;try{const e={power_option:s,bmc_UUID:r,bmc_ip:t};return console.log(e),!0}catch(l){console.error("Error fetching data:",l)}},o=async e=>{const{fanOption:s,bmcUUID:r,bmcIp:t}=e;try{const e={fan_option:s,bmc_UUID:r,bmc_ip:t};return console.log(e),!0}catch(l){console.error("Error fetching data:",l)}}},5045:(e,s,r)=>{r.d(s,{A:()=>p});var t=r(4398),l=r(1418),a=r(9689),c=r(6323),n=r(1917),o=r(4101),i=r(5968),d=r(4227),m=r(713),h=r(579);const p=e=>{const{url:s,visible:r,setVisible:p}=e;return(0,h.jsxs)(t.z,{size:"xl",alignment:"center",visible:r,onClose:()=>{p(!1)},labelledby:"VerticallyCenteredExample",children:[(0,h.jsx)(l.E,{children:(0,h.jsx)(a.l,{id:"VerticallyCenteredExample",children:"BMC\uc11c\ubc84 Console"})}),(0,h.jsx)(c.T,{className:"text-center m-3",children:(0,h.jsx)(n.q,{children:(0,h.jsx)(o.s,{className:"mb-3",children:(0,h.jsx)("div",{className:"embed-responsive embed-responsive-1by1",children:(0,h.jsx)("iframe",{className:"embed-responsive-item",src:"https://www.youtube.com/embed/zpOULjyy-n8?rel=0",allowFullScreen:!0})})})})}),(0,h.jsx)(i.I,{children:(0,h.jsx)("div",{className:"d-flex col-12 mx-auto",children:(0,h.jsx)(d.U,{className:"me-2 col-12",children:(0,h.jsx)(m.A,{text:"\ucde8\uc18c",onClick:()=>{p(!1)}})})})})]})}},2558:(e,s,r)=>{r.d(s,{A:()=>b});var t=r(4398),l=r(1418),a=r(9689),c=r(6323),n=r(1917),o=r(4101),i=r(5043),d=r(8e3),m=r(5407),h=r(3003),p=r(579);const b=e=>{const{bmcUUID:s,visible:r,setVisible:b}=e,x=(0,h.wA)(),[u,j]=(0,i.useState)();return(0,i.useEffect)((()=>{r&&(0,m.n$)({bmcUUID:"UUID_1"}).then((async e=>{0===e.inventory_detail.length?(b(!1),x({type:"modal",showAlertModal:{isShow:!0,title:"\u26a0\ufe0f \uc54c\ub9bc",msg:"\uc0c1\uc138 \ub370\uc774\ud130\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."}})):j(e.inventory_detail[0])})).catch((e=>{x({type:"modal",showAlertModal:{isShow:!0,title:"InventoryCatalogDetail Error",msg:"InventoryCatalogDetail\uc5d0 \ubb38\uc81c\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ud655\uc778\ud574\uc8fc\uc138\uc694"}})}))}),[r]),u?(0,p.jsxs)(t.z,{size:"xl",alignment:"center",visible:r,onClose:()=>{b(!1)},labelledby:"VerticallyCenteredExample",children:[(0,p.jsx)(l.E,{children:(0,p.jsx)(a.l,{id:"VerticallyCenteredExample",children:"BMC Inventory Catalog Detail"})}),(0,p.jsx)(c.T,{className:"text-center m-3",children:(0,p.jsxs)(n.q,{children:[(0,p.jsxs)(o.s,{className:"mb-3",children:[(0,p.jsx)(d.A,{title:"System ID",value:s}),(0,p.jsx)(d.A,{title:"Serial Number",value:u.serial_num})]}),(0,p.jsxs)(o.s,{className:"mb-3",children:[(0,p.jsx)(d.A,{title:"Firmware Version",value:u.firmware_version}),(0,p.jsx)(d.A,{title:"Model",value:u.model})]}),(0,p.jsxs)(o.s,{className:"mb-3",children:[(0,p.jsx)(d.A,{title:"BIOS Version",value:u.bios_version}),(0,p.jsx)(d.A,{title:"BMC MAC Address",value:u.mac_address})]}),(0,p.jsxs)(o.s,{className:"mb-3",children:[(0,p.jsx)(d.A,{title:"BIOS Build Time",value:u.bios_build_time}),(0,p.jsx)(d.A,{title:"Power State",value:u.power_status})]})]})})]}):(0,p.jsx)(p.Fragment,{})}},9050:(e,s,r)=>{r.r(s),r.d(s,{default:()=>w});var t=r(5043),l=r(4101),a=r(861),c=r(6105),n=r(4907),o=r(4227),i=(r(5015),r(7476)),d=r(5074),m=r(357),h=r(6477),p=r(5407),b=r(5475),x=r(9580),u=r(4303),j=r(7861),y=r(6528),v=r(2845),_=r(2657),g=r(5045),f=r(2558),I=r(579);const U=e=>{let{list:s}=e;const[r,l]=(0,t.useState)(),[a,c]=(0,t.useState)(!1),[n,o]=(0,t.useState)({}),[i,d]=(0,t.useState)();(0,t.useEffect)((()=>{if(s){const e=s.map((e=>({check:"",bmcUUID:e.bmc_UUID,bmcName:e.bmc_name,boaName:e.boa_name,vendor:e.vendor,cpuVendor:e.cpu_vendor,memoryStatus:e.memory_status,fanStatus:e.fan_status,firmwareVersion:e.firmware_version,psuStatus:e.psu_status,_cellProps:{class:{scope:"row"}}})));l(e)}}),[s]);const m=[{key:"bmc_UUID",label:"\uc11c\ubc84ID",_props:{scope:"col"}},{key:"bmc_name",label:"\uc11c\ubc84\uba85",_props:{scope:"col"}},{key:"boa_name",label:"\uadf8\ub8f9",_props:{scope:"col"}},{key:"vendor",label:"\ubca4\ub354",_props:{scope:"col"}},{key:"cpu_vendor",label:"CPU",_props:{scope:"col"}},{key:"memory_status",label:"Memory",_props:{scope:"col"}},{key:"psu_status",label:"Power Supply",_props:{scope:"col"}},{key:"fan_status",label:"FAN",_props:{scope:"col"}},{key:"firmware_version",label:"Firmware",_props:{scope:"col"}},{key:"console",label:"Console",_props:{scope:"col"}}];return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(x._,{align:"middle",responsive:!0,bordered:!0,hover:!0,children:[(0,I.jsx)(u.w,{align:"middle",color:"primary",children:(0,I.jsx)(j.Y,{children:null===m||void 0===m?void 0:m.map(((e,s)=>(0,I.jsxs)(y.$,{children:["\xa0 ",e.label]},s)))})}),(0,I.jsx)(v.C,{align:"middle",children:null===r||void 0===r?void 0:r.map(((e,s)=>(0,I.jsxs)(j.Y,{children:[(0,I.jsx)(_.c,{children:(0,I.jsx)(b.N_,{onClick:()=>{return s=e.bmcUUID,e.bmcIp,o({bmcUUID:s}),void c(!0);var s},children:e.bmcUUID})}),(0,I.jsx)(_.c,{children:e.bmcName}),(0,I.jsx)(_.c,{children:e.boaName}),(0,I.jsx)(_.c,{children:e.vendor}),(0,I.jsx)(_.c,{children:e.cpuVendor}),(0,I.jsx)(_.c,{children:e.memoryStatus}),(0,I.jsx)(_.c,{children:e.psuStatus}),(0,I.jsx)(_.c,{children:e.fanStatus}),(0,I.jsx)(_.c,{children:e.firmwareVersion}),(0,I.jsx)(_.c,{children:(0,I.jsx)("div",{className:"me-2 ms-2 mt-1 mb-1",children:(0,I.jsx)(h.A,{text:"console",onClick:()=>{var s;s=e.bmcIp,o({bmcIp:s}),d(!0)}})})})]},s)))})]}),(0,I.jsx)(f.A,{visible:a,setVisible:c,bmcUUID:n.bmcUUID}),(0,I.jsx)(g.A,{url:`http://${n.bmcIp}`,visible:i,setVisible:d})]})},w=()=>{const[e]=(0,i.lT)(["userId"]);var s=`${e.userId}`;const[r,b]=(0,t.useState)(),[x,u]=(0,t.useState)(),[j,y]=(0,t.useState)(!1),[v,_]=(0,t.useState)([]),[g,f]=(0,t.useState)([]),[w,A]=(0,t.useState)(0),[S,C]=(0,t.useState)(0);(0,t.useEffect)((()=>{N(1)}),[]);const N=e=>{try{return(0,p.em)({userId:s,page:e}).then((e=>{_(e.vendor),f(e.boa_name),b(e.inventory),u(e.pages)})).catch((e=>{console.log(e)}))}catch(r){console.error("Error fetching data:",r)}},k=e=>{let{isRefresh:r,page:t}=e;try{return(0,p.em)({userId:s,page:r?1:t}).then((e=>{b(e.inventory),r&&(y(!j),u(e.pages))}))}catch(l){console.error("Error fetching data:",l)}},D=e=>{let{isRefresh:r,page:t}=e;try{return(0,p.FV)({userId:s,vendor:w,boa:S,page:r?1:t}).then((e=>{b(e.inventory),r&&(y(!j),u(e.pages))}))}catch(l){console.error("Error fetching data:",l)}};return(0,I.jsx)(I.Fragment,{children:(0,I.jsx)(l.s,{className:"d-flex justify-content-center align-item-center",children:(0,I.jsxs)(a.E,{className:"d-flex mb-3",children:[(0,I.jsxs)(c.W,{children:[(0,I.jsx)("div",{className:"d-flex",children:(0,I.jsx)(n.Q,{style:{fontWeight:"bold"},children:"BMC Inventory Catalog"})}),(0,I.jsxs)(l.s,{className:"justify-content-end mb-4",xs:{cols:"auto"},children:[(0,I.jsx)(m.A,{options:(0,d.YA)(v,"\uc804\uccb4"),callBack:e=>A(e)}),(0,I.jsx)(m.A,{options:(0,d.YA)(g,"\uc804\uccb4"),callBack:e=>C(e)}),(0,I.jsx)(o.U,{children:(0,I.jsx)(h.A,{text:"\uac80\uc0c9",onClick:async()=>{"0"===w&&"0"===S?k({isRefresh:!0,page:1}):D({isRefresh:!0,page:1})}})})]}),(0,I.jsx)(l.s,{children:(0,I.jsx)(o.U,{className:"d-flex justify-content-end",children:(0,I.jsx)("div",{className:"d-flex",children:(0,I.jsx)(m.A,{options:(0,d.Vl)(x),reload:j,callBack:e=>{"0"===w&&"0"===S?k({isRefresh:!1,page:e}):D({isRefresh:!1,page:e})}})})})})]}),(0,I.jsx)(U,{list:r,callback:async()=>{try{D({isRefresh:!0,page:1})}catch(e){console.error("Error fetching data:",e)}}})]})})})}}}]);
//# sourceMappingURL=50.1e38dd52.chunk.js.map