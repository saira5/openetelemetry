(this["webpackJsonpreact-load-example"]=this["webpackJsonpreact-load-example"]||[]).push([[0],{34:function(e,t,a){e.exports=a(53)},53:function(e,t,a){"use strict";a.r(t);var n,r=a(2),c=a.n(r),o=a(24),l=a.n(o),u=a(15),s=a(6),m=a(16),i=function e(){new m.a(e);return c.a.createElement("div",null,c.a.createElement("h1",null,"React Plugin Demo App"),c.a.createElement(u.b,{to:"/test"},c.a.createElement("button",null,"Enter")))},p=a(20),E=a(55),d=a(0),f=function(e,t){return d.l.trace.getTracer(e).startSpan(t)};a(4);!function(e){e.EFFECT_SPAN="reactLoad: useEffects",e.LOCATION_URL="location",e.REACT_NAME="react_component_name",e.REACT_STATE="react_component_state",e.REACT_ERROR="react_error"}(n||(n={}));c.a.createContext(),c.a.useEffect;!function(){var e=c.a.useEffect;console.log("tracerUseEffect function called"),c.a.useEffect=function(){console.log("Tracking use effect called ");var t=f("example-react-load",n.EFFECT_SPAN);t.end();for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return e.apply(c.a,r)}}();var g=a(28),h=a(14),v=a(31),b=a(32),x=a(30),w=a(11),A=a(5);!function(e){var t=new v.a({resource:new w.a(Object(g.a)({},A.b.SERVICE_NAME,"react-load-example"))}),a=new x.a({url:"http://localhost:55678/v1/trace"});t.addSpanProcessor(new h.c(new h.b)),t.addSpanProcessor(new h.c(a)),t.register({contextManager:new b.a});var n=t.getTracer(e);m.a.setTracer(e),d.m.setLogger(new d.a)}("example-react-load"),l.a.render(c.a.createElement(u.a,null,c.a.createElement("main",null,c.a.createElement(s.a,{exact:!0,path:"/",component:i}),c.a.createElement(s.a,{exact:!0,path:"/test",component:function(){var e=Object(r.useState)(!1),t=Object(p.a)(e,2),a=t[0],n=t[1],o=Object(r.useState)(null),l=Object(p.a)(o,2),u=l[0],s=l[1];return Object(r.useEffect)((function(){return f("example-react-load","reactload-: mounting").end(),function(){console.log("Behavior right before the component is removed from the DOM."),f("example-react-load","reactload-: unmounting").end()}}),[]),c.a.createElement("div",null,c.a.createElement("h1",null,"React Plugin Demo App"),c.a.createElement(E.a,{className:"m-3",onClick:function(e){n(!0);Math.random();var t=f("example-react-load","reactload: btnClick");(console.log("================= trigger api========="),fetch("http://hn.algolia.com/api/v1/users/pg")).then((function(e){return e.json()})).then((function(e){console.log(e),t.end(),n(!1),s(e)}))},variant:"primary",size:"lg"},"Make Request"),c.a.createElement("div",{id:"results",className:"m-3"},a&&c.a.createElement("div",null," Loading results..."),u&&c.a.createElement("div",null,"Username is: ",u.username)))}}))),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.2cbba79f.chunk.js.map