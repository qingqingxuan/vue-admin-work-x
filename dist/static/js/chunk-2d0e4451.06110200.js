(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e4451"],{9004:function(e,t,n){"use strict";n.r(t);n("159b"),n("b0c0"),n("ac1f"),n("5319"),n("a434"),n("d81d");var r=n("7a23"),o=n("030a"),a=n("4763"),c=n("a1e9"),l=n("5c40"),i=n("3ef4"),u=n("c9a1"),d=n("2ef0"),b=n.n(d),s=n("7996"),p={class:"main-container"},f=Object(r["createTextVNode"])("添加 "),v=Object(r["defineComponent"])({expose:[],setup:function(e){var t="dp_code_",n=Object(c["p"])([{label:"部门名称",prop:"name"},{label:"部门编号",prop:"depCode"},{label:"排序",prop:"order"},{label:"状态",prop:"status"},{label:"操作",prop:"actions"}]),d=Object(c["r"])(),v=Object(c["r"])(),O=Object(s["b"])(),j=O.tableConfig,h=O.tableLoading,m=O.dataList,C=O.handleSuccess,w={label:"上级部门",type:"select",name:"parentId",value:"",placeholder:"请选择上级部门",selectOptions:{},reset:function(){this.value=""}},x={label:"部门编号",type:"input",name:"depCode",value:"",maxLength:10,disabled:!1,inputType:"text",placeholder:"请输入部门编号",validator:function(e){return!!e.value||(i["a"].error(e.placeholder),!1)},reset:function(){this.value="",this.disabled=!1}},y=Object(c["p"])([w,{label:"部门名称",type:"input",name:"name",value:"",maxLength:50,inputType:"text",placeholder:"请输入部门名称",validator:function(e){return!!e.value||(i["a"].error(e.placeholder),!1)},reset:function(){this.value=""}},x,{label:"部门状态",type:"radio-group",name:"status",value:1,radioOptions:[{label:"正常",value:1},{label:"禁用",value:0}],reset:function(){this.value=1}}]),g=function(e){var n;y.forEach((function(n){var r=e[n.name];r&&("depCode"===n.name?n.value=r.replace(t,""):n.value=r)})),x.disabled=!0,null===(n=d.value)||void 0===n||n.show((function(){var e;null!==(e=v.value)&&void 0!==e&&e.checkParams()&&(d.value.loading=!0,setTimeout((function(){var e,t;i["a"].success("模拟修改成功，添加参数为："+JSON.stringify(null===(e=v.value)||void 0===e?void 0:e.generatorParams())),null===(t=d.value)||void 0===t||t.close()}),3e3))}))},k=function(){Object(o["c"])({url:a["f"]}).then(C)};function V(e,t){for(var n=0;n<e.length;n++){var r=e[n];if(r.id===t.id)return b.a.isEmpty(r.children)?void e.splice(n,1):void i["a"].error("当前部门下有子部门，不能删除");b.a.isEmpty(r.children)||V(r.children,t)}}var N=function(e){u["a"].confirm("确定要删除此信息，删除后不可恢复？","提示").then((function(){V(m,e)})).catch(console.log)},_=function(){var e;y.forEach((function(e){return e.reset()})),null===(e=d.value)||void 0===e||e.show((function(){var e;null!==(e=v.value)&&void 0!==e&&e.checkParams()&&(d.value.loading=!0,setTimeout((function(){var e,t;i["a"].success("模拟添加成功，添加参数为："+JSON.stringify(null===(e=v.value)||void 0===e?void 0:e.generatorParams())),null===(t=d.value)||void 0===t||t.close()}),3e3))}))};return w.selectOptions=Object(c["c"])((function(){return m.map((function(e){return{label:e.name,value:e.id}}))})),Object(l["nb"])(k),function(e,t){var o=Object(r["resolveComponent"])("el-button"),a=Object(r["resolveComponent"])("TableHeader"),c=Object(r["resolveComponent"])("el-table-column"),l=Object(r["resolveComponent"])("el-switch"),i=Object(r["resolveComponent"])("el-table"),u=Object(r["resolveComponent"])("TableBody"),b=Object(r["resolveComponent"])("BaseForm"),s=Object(r["resolveComponent"])("Dialog"),O=Object(r["resolveDirective"])("loading");return Object(r["openBlock"])(),Object(r["createBlock"])("div",p,[Object(r["createVNode"])(a,{ref:tableHeader},{right:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(o,{type:"primary",size:"mini",icon:"PlusIcon",onClick:_},{default:Object(r["withCtx"])((function(){return[f]})),_:1})]})),_:1},512),Object(r["createVNode"])(u,{ref:tableBody},{default:Object(r["withCtx"])((function(){return[Object(r["withDirectives"])(Object(r["createVNode"])(i,{ref:table,data:Object(r["unref"])(m),"header-cell-style":Object(r["unref"])(j).headerCellStyle,size:Object(r["unref"])(j).size,stripe:Object(r["unref"])(j).stripe,border:Object(r["unref"])(j).border,"row-key":"id","tree-props":{children:"children"}},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(c,{align:"center",label:"序号",fixed:"left",width:"80"},{default:Object(r["withCtx"])((function(e){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.$index+1),1)]})),_:1}),(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(Object(r["unref"])(n),(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(c,{key:e.props,label:e.label,prop:e.prop,align:"center"},Object(r["createSlots"])({_:2},["status"===e.prop?{name:"default",fn:Object(r["withCtx"])((function(e){return[Object(r["createVNode"])(l,{modelValue:e.row.status,"onUpdate:modelValue":function(t){return e.row.status=t},"active-value":1,"inactive-value":0},null,8,["modelValue","onUpdate:modelValue"])]}))}:"actions"===e.prop?{name:"default",fn:Object(r["withCtx"])((function(e){return[Object(r["createVNode"])(o,{type:"text",onClick:function(t){return g(e.row)}},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])("编辑")]})),_:2},1032,["onClick"]),Object(r["createVNode"])(o,{type:"text",onClick:function(t){return N(e.row)}},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])("删除")]})),_:2},1032,["onClick"])]}))}:void 0]),1032,["label","prop"])})),128))]})),_:1},8,["data","header-cell-style","size","stripe","border"]),[[O,Object(r["unref"])(h)]])]})),_:1},512),Object(r["createVNode"])(s,{ref:d},{content:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(b,{ref:v,"form-items":Object(r["unref"])(y)},null,8,["form-items"])]})),_:1},512)])}}});t["default"]=v}}]);