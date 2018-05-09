webpackJsonp([1],{NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),n=a("bm7V"),r=a.n(n),i={name:"ConversationalForm",data:function(){return{step:0,q:"",screenplay:Array,values:Array,patterns:Array,finished:!1,scrollBackward:!1,scrollForward:!1,scrollInterval:null}},mounted:function(){this.init()},computed:{currentStepType:function(){return(this.screenplay[this.step]||{type:"text"}).type}},methods:{init:function(){var t=this;this.screenplay=this.$slots.default.filter(function(t){return"fieldset"===t.tag}).map(function(e){var a=e.children.filter(function(t){return["input","select","button"].includes(t.tag)});if(0===a.length)return null;var s=(a=a[0]).data.attrs.placeholder||a.data.attrs.name;if(a.data.attrs["data-question"]&&(s=(s=a.data.attrs["data-question"].split("|"))[Math.floor(Math.random()*s.length)]),a.data.attrs.pattern&&(t.patterns[a.data.attrs.name]=new RegExp(a.data.attrs.pattern)),"input"===a.tag&&"radio"===a.data.attrs.type){var n=e.children.filter(function(t){return"input"===t.tag&&"radio"===t.data.attrs.type}).map(function(t){return t.data.attrs?{text:t.data.attrs["data-text"],value:t.data.attrs.value}:{text:"",value:""}}).filter(function(t){return""!==t.value});return{type:"select",name:a.data.attrs.name,options:n,desc:s}}switch(a.tag){case"input":return{type:a.data.attrs.type,name:a.data.attrs.name,invalidMessage:a.data.attrs["data-invalid"]||"Not Valid",desc:s};case"select":return{type:"select",name:a.data.attrs.name,options:a.children.filter(function(t){return t.tag}).filter(function(t){return"option"===t.tag}).map(function(t){var e=(t.children||[{text:""}])[0].text;return t.data?{text:e,value:(t.data.attrs||{value:e}).value}:{text:e,value:e}}).filter(function(t){return""!==t.value}),desc:s};case"button":return{type:"button",name:a.data.attrs.name,successMessage:a.data.attrs["data-success"],options:[{text:(a.children||[{text:"Submit"}])[0].text,value:(a.data||{attrs:{value:"submit"}}).attrs.value,action:a.data.attrs.type},{text:a.data.attrs["data-cancel"]||"Not Valid",value:"no",type:a.data.attrs.type,action:"cancel"}],desc:s}}}).filter(function(t){return t}),this.step=0,this.finished=!1,this.values={}},parse:function(t){var e=this,a=t.desc.replace(/(\{)([a-z]+)(\})/g,function(t,a,s,n){return(e.values[s]||{text:s}).text}).split("|");return 1===a.length?a[0]:a[Math.floor(Math.random()*a.length)]},choose:function(t){var e=this;if(!this.finished&&["select","button"].includes(this.currentStepType)){var a=!0;if("button"===this.currentStepType){if("submit"===t.action){var s=Object.keys(this.values).reduce(function(t,a){return t[a]=e.values[a].value,t},{});this.$emit("submit",s),this.screenplay[this.step].successMessage&&this.screenplay.splice(this.step+1,0,{type:"message",name:this.screenplay[this.step].name,desc:this.screenplay[this.step].successMessage,successMessage:this.screenplay[this.step].successMessage}),this.screenplay[this.step].answer=this.q,this.finished=!0}"reset"===t.action&&(a=!1,this.init()),"cancel"===t.action&&"reset"===t.type&&(this.screenplay[this.step].answer=this.q,this.finished=!0)}a&&(this.screenplay[this.step].answer=t.text,this.values[this.screenplay[this.step].name]=t,this.doStep())}},send:function(){if(!this.finished&&!["select","submit"].includes(this.currentStepType)&&""!==this.q.trim()){if(this.patterns[this.screenplay[this.step].name]instanceof RegExp)if(!this.patterns[this.screenplay[this.step].name].test(this.q))return this.screenplay.splice(this.step+1,0,{type:"message",name:this.screenplay[this.step].name,desc:this.screenplay[this.step].invalidMessage,invalidMessage:this.screenplay[this.step].invalidMessage}),this.screenplay[this.step].answer=this.q,void this.doStep();this.screenplay[this.step].answer=this.q,this.values[this.screenplay[this.step].name]={text:this.q,value:this.q},this.doStep()}},doStep:function(){var t=this;this.scrollToBottom(),this.q="",this.step++,this.scrollBackward=!1,this.scrollForward=!1,["select","button"].includes(this.currentStepType)?this.$nextTick(function(){return setTimeout(function(){t.stopScroll()},600)}):this.$nextTick(function(){return t.$refs.input.focus()})},scrollToBottom:function(){var t=this.$refs["scroll-box"].children;r.a.scrollTo(t[t.length-1],300,{container:this.$refs["scroll-box"],easing:"ease-in",y:!0,x:!1})},doScrollBackward:function(){var t=this,e=this.$refs.options;this.scrollInterval=setInterval(function(){e.scrollLeft-=5,e.scrollLeft||t.stopScroll()},25)},doScrollForward:function(){var t=this,e=this.$refs.options,a=e.scrollWidth-e.clientWidth;this.scrollInterval=setInterval(function(){e.scrollLeft+=5,e.scrollLeft===a&&t.stopScroll()},25)},stopScroll:function(){var t=this.$refs.options,e=t.scrollWidth-t.clientWidth;this.scrollBackward=t.scrollLeft>10,this.scrollForward=t.scrollLeft<e-10,clearInterval(this.scrollInterval)}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"vcf-container"},[a("div",{staticClass:"vcf-messages"},[a("div",{ref:"scroll-box"},[t._l(t.screenplay,function(e,s){return s<=t.step?[a("div",{key:"q"+s,staticClass:"vcf-question"},[a("span",[t._v(t._s(t.parse(e)))])]),t._v(" "),a("div",{key:"a"+s,staticClass:"vcf-answer"},[a("transition",{attrs:{name:"scale"}},[e.answer?a("span",[t._v(t._s(e.answer))]):t._e()])],1)]:t._e()})],2)]),t._v(" "),a("div",{class:{"vcf-input-container":!0,finished:t.finished}},[a("transition",{attrs:{name:"fade"}},["select"===t.currentStepType||"button"==t.currentStepType?a("div",{ref:"options",staticClass:"vcf-options"},t._l(t.screenplay[t.step].options,function(e,s){return a("div",{key:"o"+s,staticClass:"vcf-option",on:{click:function(a){t.choose(e)}}},[t._v("\n            "+t._s(e.text)+"\n          ")])})):t._e()]),t._v(" "),a("transition",{attrs:{name:"fade"}},["select"===t.currentStepType||"button"==t.currentStepType?a("div",{staticClass:"vcf-options-arrows"},[a("div",{staticClass:"backward",class:{visible:t.scrollBackward},on:{mouseenter:t.doScrollBackward,mouseleave:t.stopScroll}}),t._v(" "),a("div",{staticClass:"forward",class:{visible:t.scrollForward},on:{mouseover:t.doScrollForward,mouseleave:t.stopScroll}})]):t._e()]),t._v(" "),"checkbox"===t.currentStepType?a("input",{directives:[{name:"model",rawName:"v-model",value:t.q,expression:"q"}],ref:"input",staticClass:"vcf-input",attrs:{disabled:t.finished,autofocus:"",type:"checkbox"},domProps:{checked:Array.isArray(t.q)?t._i(t.q,null)>-1:t.q},on:{keypress:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.send(e):null},change:function(e){var a=t.q,s=e.target,n=!!s.checked;if(Array.isArray(a)){var r=t._i(a,null);s.checked?r<0&&(t.q=a.concat([null])):r>-1&&(t.q=a.slice(0,r).concat(a.slice(r+1)))}else t.q=n}}}):"radio"===t.currentStepType?a("input",{directives:[{name:"model",rawName:"v-model",value:t.q,expression:"q"}],ref:"input",staticClass:"vcf-input",attrs:{disabled:t.finished,autofocus:"",type:"radio"},domProps:{checked:t._q(t.q,null)},on:{keypress:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.send(e):null},change:function(e){t.q=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:t.q,expression:"q"}],ref:"input",staticClass:"vcf-input",attrs:{disabled:t.finished,autofocus:"",type:t.currentStepType},domProps:{value:t.q},on:{keypress:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.send(e):null},input:function(e){e.target.composing||(t.q=e.target.value)}}}),t._v(" "),a("transition",{attrs:{name:"fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:!("select"===t.currentStepType||"button"==t.currentStepType),expression:"!(currentStepType === 'select' || currentStepType == 'button')"}],staticClass:"vcf-send-button",on:{click:t.send}})])],1)])])},staticRenderFns:[]};var l={name:"App",components:{ConversationalForm:a("VU/8")(i,o,!1,function(t){a("YvyC")},"data-v-5c323557",null).exports},methods:{submit:function(t){console.log("Submit:"),console.log(t)}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("h1",[t._v("Vue.js Conversational Form")]),t._v(" "),t._m(0),t._v(" "),a("div"),t._v(" "),a("ConversationalForm",{attrs:{id:"vcf"},on:{submit:t.submit}},[a("fieldset",[a("label",{attrs:{for:"name"}},[t._v("What's your name?")]),t._v(" "),a("input",{attrs:{required:"","data-question":"Hi there! What's your name? ",type:"text",name:"name",id:"name"}})]),t._v(" "),a("fieldset",[a("label",{attrs:{for:"name"}},[t._v("What's your gender?")]),t._v(" "),a("input",{attrs:{type:"radio","data-question":"What's your gender?",name:"gender",value:"male","data-text":"Male"}}),t._v(" Male"),a("br"),t._v(" "),a("input",{attrs:{type:"radio",name:"gender",value:"female","data-text":"Female"}}),t._v(" Female"),a("br"),t._v(" "),a("input",{attrs:{type:"radio",name:"gender",value:"other","data-text":"Other"}}),t._v(" Other\n    ")]),t._v(" "),a("fieldset",[a("label",{attrs:{for:"occupation"}},[t._v("Occupation")]),t._v(" "),a("select",{attrs:{"data-question":"Great to meet you, {name}! I'm a web form, what do you do?|Awesome, {name}! And what do you do?",name:"occupation",id:"occupation"}},[a("option",{attrs:{value:"developer"}},[t._v("Developer")]),t._v(" "),a("option",{attrs:{value:"designer"}},[t._v("Designer")]),t._v(" "),a("option",{attrs:{value:"curious-mind"}},[t._v("Curious mind")]),t._v(" "),a("option",{attrs:{value:"lost-cause"}},[t._v("Lost cause")])])]),t._v(" "),a("fieldset",[a("label",{attrs:{for:"company"}},[t._v("Company")]),t._v(" "),a("input",{attrs:{"data-question":"{occupation}, nice! Which company are you with?",type:"text",name:"company",id:"company"}})]),t._v(" "),a("fieldset",[a("label",{attrs:{for:"opinion"}},[t._v("Will conversational interfaces be everywhere?")]),t._v(" "),a("select",{attrs:{"data-question":"Do you think conversational forms will replace web forms in the future?",name:"opinion",id:"opinion"}},[a("option"),t._v(" "),a("option",[t._v("Definitely")]),t._v(" "),a("option",[t._v("Maybe")]),t._v(" "),a("option",[t._v("No")])])]),t._v(" "),a("fieldset",[a("label",{attrs:{for:"email"}},[t._v("Email")]),t._v(" "),a("input",{attrs:{pattern:".+\\@.+\\..+","data-invalid":"E-mail not correct","data-question":"Please give me your email.",type:"email",name:"email",id:"your-email"}})]),t._v(" "),a("fieldset",[a("label",{attrs:{for:"thats-all"}},[t._v("Are you ready to submit the form?")]),t._v(" "),a("button",{attrs:{"data-question":"Are you ready to submit the form?","data-success":"Submited! Yay! 😄",name:"submit",type:"submit","data-cancel":"Nope"}},[t._v("Yup")])]),t._v(" "),a("fieldset",[a("label",{attrs:{for:"thats-all"}},[t._v("Want to start over?")]),t._v(" "),a("button",{attrs:{"data-question":"Want to start over?",name:"reset",type:"reset","data-cancel":"No"}},[t._v("Yes, let's go again")])])])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",[a("fieldset",[a("label",{attrs:{for:"name"}},[t._v("Name")]),t._v(" "),a("input",{attrs:{required:"","data-question":"Hi there! What's your name? ",type:"text",name:"name",id:"name"}})]),t._v(" "),a("fieldset",[a("label",{attrs:{for:"name"}},[t._v("Gender")]),a("br"),t._v(" "),a("input",{attrs:{type:"radio","data-question":"What's your gender?",name:"gender",value:"male","data-text":"Male"}}),t._v(" Male"),a("br"),t._v(" "),a("input",{attrs:{type:"radio",name:"gender",value:"female","data-text":"Female"}}),t._v(" Female"),a("br"),t._v(" "),a("input",{attrs:{type:"radio",name:"gender",value:"other","data-text":"Other"}}),t._v(" Other\n    ")]),t._v(" "),a("fieldset",[a("label",{attrs:{for:"occupation"}},[t._v("Occupation")]),t._v(" "),a("select",{attrs:{"data-question":"Great to meet you, {name}! I'm a web form, what do you do?|Awesome, {name}! And what do you do?",name:"occupation",id:"occupation"}},[a("option",{attrs:{value:"developer"}},[t._v("Developer")]),t._v(" "),a("option",{attrs:{value:"designer"}},[t._v("Designer")]),t._v(" "),a("option",{attrs:{value:"curious-mind"}},[t._v("Curious mind")]),t._v(" "),a("option",{attrs:{value:"lost-cause"}},[t._v("Lost cause")])])]),t._v(" "),a("fieldset",[a("label",{attrs:{for:"company"}},[t._v("Company")]),t._v(" "),a("input",{attrs:{"data-question":"{occupation}, nice! Which company are you with?",type:"text",name:"company",id:"company"}})]),t._v(" "),a("fieldset",[a("label",{attrs:{for:"opinion"}},[t._v("Will conversational interfaces be everywhere?")]),t._v(" "),a("select",{attrs:{"data-question":"Do you think conversational forms will replace web forms in the future?",name:"opinion",id:"opinion"}},[a("option"),t._v(" "),a("option",[t._v("Definitely")]),t._v(" "),a("option",[t._v("Maybe")]),t._v(" "),a("option",[t._v("No")])])]),t._v(" "),a("fieldset",[a("label",{attrs:{for:"email"}},[t._v("Email")]),t._v(" "),a("input",{attrs:{pattern:".+\\@.+\\..+","data-invalid":"E-mail not correct","data-question":"Please give me your email.",type:"email",name:"email",id:"your-email"}})]),t._v(" "),a("fieldset",[a("label",{attrs:{for:"thats-all"}},[t._v("Are you ready to submit the form?")]),t._v(" "),a("button",{attrs:{"data-question":"Are you ready to submit the form?","data-success":"Submited! Yay! 😄",name:"submit",type:"submit","data-cancel":"Nope"}},[t._v("Yup")])]),t._v(" "),a("fieldset",[a("label",{attrs:{for:"thats-all"}},[t._v("Want to start over?")]),t._v(" "),a("button",{attrs:{"data-question":"Want to start over?",name:"reset",type:"reset","data-cancel":"No"}},[t._v("Yes, let's go again")])])])}]};var u=a("VU/8")(l,c,!1,function(t){a("y0O9")},null,null).exports;s.a.config.productionTip=!1,new s.a({el:"#app",components:{App:u},template:"<App/>"})},YvyC:function(t,e){},y0O9:function(t,e){}},["NHnr"]);