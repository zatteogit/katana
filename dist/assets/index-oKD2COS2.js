(function(){const x=document.createElement("link").relList;if(x&&x.supports&&x.supports("modulepreload"))return;for(const z of document.querySelectorAll('link[rel="modulepreload"]'))T(z);new MutationObserver(z=>{for(const C of z)if(C.type==="childList")for(const F of C.addedNodes)F.tagName==="LINK"&&F.rel==="modulepreload"&&T(F)}).observe(document,{childList:!0,subtree:!0});function p(z){const C={};return z.integrity&&(C.integrity=z.integrity),z.referrerPolicy&&(C.referrerPolicy=z.referrerPolicy),z.crossOrigin==="use-credentials"?C.credentials="include":z.crossOrigin==="anonymous"?C.credentials="omit":C.credentials="same-origin",C}function T(z){if(z.ep)return;z.ep=!0;const C=p(z);fetch(z.href,C)}})();var Di={exports:{}},Nr={},Hi={exports:{}},V={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qc;function dp(){if(qc)return V;qc=1;var c=Symbol.for("react.element"),x=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),T=Symbol.for("react.strict_mode"),z=Symbol.for("react.profiler"),C=Symbol.for("react.provider"),F=Symbol.for("react.context"),H=Symbol.for("react.forward_ref"),K=Symbol.for("react.suspense"),re=Symbol.for("react.memo"),ae=Symbol.for("react.lazy"),Y=Symbol.iterator;function L(f){return f===null||typeof f!="object"?null:(f=Y&&f[Y]||f["@@iterator"],typeof f=="function"?f:null)}var le={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},xe=Object.assign,J={};function P(f,y,D){this.props=f,this.context=y,this.refs=J,this.updater=D||le}P.prototype.isReactComponent={},P.prototype.setState=function(f,y){if(typeof f!="object"&&typeof f!="function"&&f!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,f,y,"setState")},P.prototype.forceUpdate=function(f){this.updater.enqueueForceUpdate(this,f,"forceUpdate")};function Ie(){}Ie.prototype=P.prototype;function Ze(f,y,D){this.props=f,this.context=y,this.refs=J,this.updater=D||le}var Ve=Ze.prototype=new Ie;Ve.constructor=Ze,xe(Ve,P.prototype),Ve.isPureReactComponent=!0;var Ne=Array.isArray,rt=Object.prototype.hasOwnProperty,Ae={current:null},Le={key:!0,ref:!0,__self:!0,__source:!0};function qe(f,y,D){var U,W={},$=null,ee=null;if(y!=null)for(U in y.ref!==void 0&&(ee=y.ref),y.key!==void 0&&($=""+y.key),y)rt.call(y,U)&&!Le.hasOwnProperty(U)&&(W[U]=y[U]);var q=arguments.length-2;if(q===1)W.children=D;else if(1<q){for(var se=Array(q),Ue=0;Ue<q;Ue++)se[Ue]=arguments[Ue+2];W.children=se}if(f&&f.defaultProps)for(U in q=f.defaultProps,q)W[U]===void 0&&(W[U]=q[U]);return{$$typeof:c,type:f,key:$,ref:ee,props:W,_owner:Ae.current}}function It(f,y){return{$$typeof:c,type:f.type,key:y,ref:f.ref,props:f.props,_owner:f._owner}}function wt(f){return typeof f=="object"&&f!==null&&f.$$typeof===c}function qt(f){var y={"=":"=0",":":"=2"};return"$"+f.replace(/[=:]/g,function(D){return y[D]})}var pt=/\/+/g;function Ke(f,y){return typeof f=="object"&&f!==null&&f.key!=null?qt(""+f.key):y.toString(36)}function lt(f,y,D,U,W){var $=typeof f;($==="undefined"||$==="boolean")&&(f=null);var ee=!1;if(f===null)ee=!0;else switch($){case"string":case"number":ee=!0;break;case"object":switch(f.$$typeof){case c:case x:ee=!0}}if(ee)return ee=f,W=W(ee),f=U===""?"."+Ke(ee,0):U,Ne(W)?(D="",f!=null&&(D=f.replace(pt,"$&/")+"/"),lt(W,y,D,"",function(Ue){return Ue})):W!=null&&(wt(W)&&(W=It(W,D+(!W.key||ee&&ee.key===W.key?"":(""+W.key).replace(pt,"$&/")+"/")+f)),y.push(W)),1;if(ee=0,U=U===""?".":U+":",Ne(f))for(var q=0;q<f.length;q++){$=f[q];var se=U+Ke($,q);ee+=lt($,y,D,se,W)}else if(se=L(f),typeof se=="function")for(f=se.call(f),q=0;!($=f.next()).done;)$=$.value,se=U+Ke($,q++),ee+=lt($,y,D,se,W);else if($==="object")throw y=String(f),Error("Objects are not valid as a React child (found: "+(y==="[object Object]"?"object with keys {"+Object.keys(f).join(", ")+"}":y)+"). If you meant to render a collection of children, use an array instead.");return ee}function ft(f,y,D){if(f==null)return f;var U=[],W=0;return lt(f,U,"","",function($){return y.call(D,$,W++)}),U}function Pe(f){if(f._status===-1){var y=f._result;y=y(),y.then(function(D){(f._status===0||f._status===-1)&&(f._status=1,f._result=D)},function(D){(f._status===0||f._status===-1)&&(f._status=2,f._result=D)}),f._status===-1&&(f._status=0,f._result=y)}if(f._status===1)return f._result.default;throw f._result}var pe={current:null},k={transition:null},O={ReactCurrentDispatcher:pe,ReactCurrentBatchConfig:k,ReactCurrentOwner:Ae};function E(){throw Error("act(...) is not supported in production builds of React.")}return V.Children={map:ft,forEach:function(f,y,D){ft(f,function(){y.apply(this,arguments)},D)},count:function(f){var y=0;return ft(f,function(){y++}),y},toArray:function(f){return ft(f,function(y){return y})||[]},only:function(f){if(!wt(f))throw Error("React.Children.only expected to receive a single React element child.");return f}},V.Component=P,V.Fragment=p,V.Profiler=z,V.PureComponent=Ze,V.StrictMode=T,V.Suspense=K,V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=O,V.act=E,V.cloneElement=function(f,y,D){if(f==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+f+".");var U=xe({},f.props),W=f.key,$=f.ref,ee=f._owner;if(y!=null){if(y.ref!==void 0&&($=y.ref,ee=Ae.current),y.key!==void 0&&(W=""+y.key),f.type&&f.type.defaultProps)var q=f.type.defaultProps;for(se in y)rt.call(y,se)&&!Le.hasOwnProperty(se)&&(U[se]=y[se]===void 0&&q!==void 0?q[se]:y[se])}var se=arguments.length-2;if(se===1)U.children=D;else if(1<se){q=Array(se);for(var Ue=0;Ue<se;Ue++)q[Ue]=arguments[Ue+2];U.children=q}return{$$typeof:c,type:f.type,key:W,ref:$,props:U,_owner:ee}},V.createContext=function(f){return f={$$typeof:F,_currentValue:f,_currentValue2:f,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},f.Provider={$$typeof:C,_context:f},f.Consumer=f},V.createElement=qe,V.createFactory=function(f){var y=qe.bind(null,f);return y.type=f,y},V.createRef=function(){return{current:null}},V.forwardRef=function(f){return{$$typeof:H,render:f}},V.isValidElement=wt,V.lazy=function(f){return{$$typeof:ae,_payload:{_status:-1,_result:f},_init:Pe}},V.memo=function(f,y){return{$$typeof:re,type:f,compare:y===void 0?null:y}},V.startTransition=function(f){var y=k.transition;k.transition={};try{f()}finally{k.transition=y}},V.unstable_act=E,V.useCallback=function(f,y){return pe.current.useCallback(f,y)},V.useContext=function(f){return pe.current.useContext(f)},V.useDebugValue=function(){},V.useDeferredValue=function(f){return pe.current.useDeferredValue(f)},V.useEffect=function(f,y){return pe.current.useEffect(f,y)},V.useId=function(){return pe.current.useId()},V.useImperativeHandle=function(f,y,D){return pe.current.useImperativeHandle(f,y,D)},V.useInsertionEffect=function(f,y){return pe.current.useInsertionEffect(f,y)},V.useLayoutEffect=function(f,y){return pe.current.useLayoutEffect(f,y)},V.useMemo=function(f,y){return pe.current.useMemo(f,y)},V.useReducer=function(f,y,D){return pe.current.useReducer(f,y,D)},V.useRef=function(f){return pe.current.useRef(f)},V.useState=function(f){return pe.current.useState(f)},V.useSyncExternalStore=function(f,y,D){return pe.current.useSyncExternalStore(f,y,D)},V.useTransition=function(){return pe.current.useTransition()},V.version="18.3.1",V}var Xc;function Zi(){return Xc||(Xc=1,Hi.exports=dp()),Hi.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yc;function up(){if(Yc)return Nr;Yc=1;var c=Zi(),x=Symbol.for("react.element"),p=Symbol.for("react.fragment"),T=Object.prototype.hasOwnProperty,z=c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,C={key:!0,ref:!0,__self:!0,__source:!0};function F(H,K,re){var ae,Y={},L=null,le=null;re!==void 0&&(L=""+re),K.key!==void 0&&(L=""+K.key),K.ref!==void 0&&(le=K.ref);for(ae in K)T.call(K,ae)&&!C.hasOwnProperty(ae)&&(Y[ae]=K[ae]);if(H&&H.defaultProps)for(ae in K=H.defaultProps,K)Y[ae]===void 0&&(Y[ae]=K[ae]);return{$$typeof:x,type:H,key:L,ref:le,props:Y,_owner:z.current}}return Nr.Fragment=p,Nr.jsx=F,Nr.jsxs=F,Nr}var Jc;function pp(){return Jc||(Jc=1,Di.exports=up()),Di.exports}var i=pp(),Hl={},Vi={exports:{}},He={},Ki={exports:{}},Ui={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ed;function fp(){return ed||(ed=1,(function(c){function x(k,O){var E=k.length;k.push(O);e:for(;0<E;){var f=E-1>>>1,y=k[f];if(0<z(y,O))k[f]=O,k[E]=y,E=f;else break e}}function p(k){return k.length===0?null:k[0]}function T(k){if(k.length===0)return null;var O=k[0],E=k.pop();if(E!==O){k[0]=E;e:for(var f=0,y=k.length,D=y>>>1;f<D;){var U=2*(f+1)-1,W=k[U],$=U+1,ee=k[$];if(0>z(W,E))$<y&&0>z(ee,W)?(k[f]=ee,k[$]=E,f=$):(k[f]=W,k[U]=E,f=U);else if($<y&&0>z(ee,E))k[f]=ee,k[$]=E,f=$;else break e}}return O}function z(k,O){var E=k.sortIndex-O.sortIndex;return E!==0?E:k.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var C=performance;c.unstable_now=function(){return C.now()}}else{var F=Date,H=F.now();c.unstable_now=function(){return F.now()-H}}var K=[],re=[],ae=1,Y=null,L=3,le=!1,xe=!1,J=!1,P=typeof setTimeout=="function"?setTimeout:null,Ie=typeof clearTimeout=="function"?clearTimeout:null,Ze=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Ve(k){for(var O=p(re);O!==null;){if(O.callback===null)T(re);else if(O.startTime<=k)T(re),O.sortIndex=O.expirationTime,x(K,O);else break;O=p(re)}}function Ne(k){if(J=!1,Ve(k),!xe)if(p(K)!==null)xe=!0,Pe(rt);else{var O=p(re);O!==null&&pe(Ne,O.startTime-k)}}function rt(k,O){xe=!1,J&&(J=!1,Ie(qe),qe=-1),le=!0;var E=L;try{for(Ve(O),Y=p(K);Y!==null&&(!(Y.expirationTime>O)||k&&!qt());){var f=Y.callback;if(typeof f=="function"){Y.callback=null,L=Y.priorityLevel;var y=f(Y.expirationTime<=O);O=c.unstable_now(),typeof y=="function"?Y.callback=y:Y===p(K)&&T(K),Ve(O)}else T(K);Y=p(K)}if(Y!==null)var D=!0;else{var U=p(re);U!==null&&pe(Ne,U.startTime-O),D=!1}return D}finally{Y=null,L=E,le=!1}}var Ae=!1,Le=null,qe=-1,It=5,wt=-1;function qt(){return!(c.unstable_now()-wt<It)}function pt(){if(Le!==null){var k=c.unstable_now();wt=k;var O=!0;try{O=Le(!0,k)}finally{O?Ke():(Ae=!1,Le=null)}}else Ae=!1}var Ke;if(typeof Ze=="function")Ke=function(){Ze(pt)};else if(typeof MessageChannel<"u"){var lt=new MessageChannel,ft=lt.port2;lt.port1.onmessage=pt,Ke=function(){ft.postMessage(null)}}else Ke=function(){P(pt,0)};function Pe(k){Le=k,Ae||(Ae=!0,Ke())}function pe(k,O){qe=P(function(){k(c.unstable_now())},O)}c.unstable_IdlePriority=5,c.unstable_ImmediatePriority=1,c.unstable_LowPriority=4,c.unstable_NormalPriority=3,c.unstable_Profiling=null,c.unstable_UserBlockingPriority=2,c.unstable_cancelCallback=function(k){k.callback=null},c.unstable_continueExecution=function(){xe||le||(xe=!0,Pe(rt))},c.unstable_forceFrameRate=function(k){0>k||125<k?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):It=0<k?Math.floor(1e3/k):5},c.unstable_getCurrentPriorityLevel=function(){return L},c.unstable_getFirstCallbackNode=function(){return p(K)},c.unstable_next=function(k){switch(L){case 1:case 2:case 3:var O=3;break;default:O=L}var E=L;L=O;try{return k()}finally{L=E}},c.unstable_pauseExecution=function(){},c.unstable_requestPaint=function(){},c.unstable_runWithPriority=function(k,O){switch(k){case 1:case 2:case 3:case 4:case 5:break;default:k=3}var E=L;L=k;try{return O()}finally{L=E}},c.unstable_scheduleCallback=function(k,O,E){var f=c.unstable_now();switch(typeof E=="object"&&E!==null?(E=E.delay,E=typeof E=="number"&&0<E?f+E:f):E=f,k){case 1:var y=-1;break;case 2:y=250;break;case 5:y=1073741823;break;case 4:y=1e4;break;default:y=5e3}return y=E+y,k={id:ae++,callback:O,priorityLevel:k,startTime:E,expirationTime:y,sortIndex:-1},E>f?(k.sortIndex=E,x(re,k),p(K)===null&&k===p(re)&&(J?(Ie(qe),qe=-1):J=!0,pe(Ne,E-f))):(k.sortIndex=y,x(K,k),xe||le||(xe=!0,Pe(rt))),k},c.unstable_shouldYield=qt,c.unstable_wrapCallback=function(k){var O=L;return function(){var E=L;L=O;try{return k.apply(this,arguments)}finally{L=E}}}})(Ui)),Ui}var td;function mp(){return td||(td=1,Ki.exports=fp()),Ki.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nd;function gp(){if(nd)return He;nd=1;var c=Zi(),x=mp();function p(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var T=new Set,z={};function C(e,t){F(e,t),F(e+"Capture",t)}function F(e,t){for(z[e]=t,e=0;e<t.length;e++)T.add(t[e])}var H=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),K=Object.prototype.hasOwnProperty,re=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ae={},Y={};function L(e){return K.call(Y,e)?!0:K.call(ae,e)?!1:re.test(e)?Y[e]=!0:(ae[e]=!0,!1)}function le(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function xe(e,t,n,r){if(t===null||typeof t>"u"||le(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function J(e,t,n,r,l,o,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=a}var P={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){P[e]=new J(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];P[t]=new J(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){P[e]=new J(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){P[e]=new J(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){P[e]=new J(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){P[e]=new J(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){P[e]=new J(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){P[e]=new J(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){P[e]=new J(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ie=/[\-:]([a-z])/g;function Ze(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Ie,Ze);P[t]=new J(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Ie,Ze);P[t]=new J(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Ie,Ze);P[t]=new J(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){P[e]=new J(e,1,!1,e.toLowerCase(),null,!1,!1)}),P.xlinkHref=new J("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){P[e]=new J(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ve(e,t,n,r){var l=P.hasOwnProperty(t)?P[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(xe(t,n,l,r)&&(n=null),r||l===null?L(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Ne=c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,rt=Symbol.for("react.element"),Ae=Symbol.for("react.portal"),Le=Symbol.for("react.fragment"),qe=Symbol.for("react.strict_mode"),It=Symbol.for("react.profiler"),wt=Symbol.for("react.provider"),qt=Symbol.for("react.context"),pt=Symbol.for("react.forward_ref"),Ke=Symbol.for("react.suspense"),lt=Symbol.for("react.suspense_list"),ft=Symbol.for("react.memo"),Pe=Symbol.for("react.lazy"),pe=Symbol.for("react.offscreen"),k=Symbol.iterator;function O(e){return e===null||typeof e!="object"?null:(e=k&&e[k]||e["@@iterator"],typeof e=="function"?e:null)}var E=Object.assign,f;function y(e){if(f===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);f=t&&t[1]||""}return`
`+f+e}var D=!1;function U(e,t){if(!e||D)return"";D=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(h){var r=h}Reflect.construct(e,[],t)}else{try{t.call()}catch(h){r=h}e.call(t.prototype)}else{try{throw Error()}catch(h){r=h}e()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var l=h.stack.split(`
`),o=r.stack.split(`
`),a=l.length-1,s=o.length-1;1<=a&&0<=s&&l[a]!==o[s];)s--;for(;1<=a&&0<=s;a--,s--)if(l[a]!==o[s]){if(a!==1||s!==1)do if(a--,s--,0>s||l[a]!==o[s]){var d=`
`+l[a].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=a&&0<=s);break}}}finally{D=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?y(e):""}function W(e){switch(e.tag){case 5:return y(e.type);case 16:return y("Lazy");case 13:return y("Suspense");case 19:return y("SuspenseList");case 0:case 2:case 15:return e=U(e.type,!1),e;case 11:return e=U(e.type.render,!1),e;case 1:return e=U(e.type,!0),e;default:return""}}function $(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Le:return"Fragment";case Ae:return"Portal";case It:return"Profiler";case qe:return"StrictMode";case Ke:return"Suspense";case lt:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case qt:return(e.displayName||"Context")+".Consumer";case wt:return(e._context.displayName||"Context")+".Provider";case pt:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ft:return t=e.displayName||null,t!==null?t:$(e.type)||"Memo";case Pe:t=e._payload,e=e._init;try{return $(e(t))}catch{}}return null}function ee(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return $(t);case 8:return t===qe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function q(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function se(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ue(e){var t=se(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(a){r=""+a,o.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ar(e){e._valueTracker||(e._valueTracker=Ue(e))}function na(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=se(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Fr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Wl(e,t){var n=t.checked;return E({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function ra(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=q(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function la(e,t){t=t.checked,t!=null&&Ve(e,"checked",t,!1)}function $l(e,t){la(e,t);var n=q(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ql(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ql(e,t.type,q(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function oa(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ql(e,t,n){(t!=="number"||Fr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Dn=Array.isArray;function pn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+q(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Zl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(p(91));return E({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ia(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(p(92));if(Dn(n)){if(1<n.length)throw Error(p(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:q(n)}}function aa(e,t){var n=q(t.value),r=q(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function sa(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function ca(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ql(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?ca(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var _r,da=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(_r=_r||document.createElement("div"),_r.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=_r.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Hn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Vn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},md=["Webkit","ms","Moz","O"];Object.keys(Vn).forEach(function(e){md.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Vn[t]=Vn[e]})});function ua(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Vn.hasOwnProperty(e)&&Vn[e]?(""+t).trim():t+"px"}function pa(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=ua(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var gd=E({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Xl(e,t){if(t){if(gd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(p(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(p(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(p(61))}if(t.style!=null&&typeof t.style!="object")throw Error(p(62))}}function Yl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Jl=null;function eo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var to=null,fn=null,mn=null;function fa(e){if(e=dr(e)){if(typeof to!="function")throw Error(p(280));var t=e.stateNode;t&&(t=nl(t),to(e.stateNode,e.type,t))}}function ma(e){fn?mn?mn.push(e):mn=[e]:fn=e}function ga(){if(fn){var e=fn,t=mn;if(mn=fn=null,fa(e),t)for(e=0;e<t.length;e++)fa(t[e])}}function ha(e,t){return e(t)}function xa(){}var no=!1;function va(e,t,n){if(no)return e(t,n);no=!0;try{return ha(e,t,n)}finally{no=!1,(fn!==null||mn!==null)&&(xa(),ga())}}function Kn(e,t){var n=e.stateNode;if(n===null)return null;var r=nl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(p(231,t,typeof n));return n}var ro=!1;if(H)try{var Un={};Object.defineProperty(Un,"passive",{get:function(){ro=!0}}),window.addEventListener("test",Un,Un),window.removeEventListener("test",Un,Un)}catch{ro=!1}function hd(e,t,n,r,l,o,a,s,d){var h=Array.prototype.slice.call(arguments,3);try{t.apply(n,h)}catch(w){this.onError(w)}}var Gn=!1,Lr=null,Pr=!1,lo=null,xd={onError:function(e){Gn=!0,Lr=e}};function vd(e,t,n,r,l,o,a,s,d){Gn=!1,Lr=null,hd.apply(xd,arguments)}function yd(e,t,n,r,l,o,a,s,d){if(vd.apply(this,arguments),Gn){if(Gn){var h=Lr;Gn=!1,Lr=null}else throw Error(p(198));Pr||(Pr=!0,lo=h)}}function Xt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ya(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function wa(e){if(Xt(e)!==e)throw Error(p(188))}function wd(e){var t=e.alternate;if(!t){if(t=Xt(e),t===null)throw Error(p(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===n)return wa(l),e;if(o===r)return wa(l),t;o=o.sibling}throw Error(p(188))}if(n.return!==r.return)n=l,r=o;else{for(var a=!1,s=l.child;s;){if(s===n){a=!0,n=l,r=o;break}if(s===r){a=!0,r=l,n=o;break}s=s.sibling}if(!a){for(s=o.child;s;){if(s===n){a=!0,n=o,r=l;break}if(s===r){a=!0,r=o,n=l;break}s=s.sibling}if(!a)throw Error(p(189))}}if(n.alternate!==r)throw Error(p(190))}if(n.tag!==3)throw Error(p(188));return n.stateNode.current===n?e:t}function ba(e){return e=wd(e),e!==null?Sa(e):null}function Sa(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Sa(e);if(t!==null)return t;e=e.sibling}return null}var Ca=x.unstable_scheduleCallback,ka=x.unstable_cancelCallback,bd=x.unstable_shouldYield,Sd=x.unstable_requestPaint,me=x.unstable_now,Cd=x.unstable_getCurrentPriorityLevel,oo=x.unstable_ImmediatePriority,Na=x.unstable_UserBlockingPriority,Rr=x.unstable_NormalPriority,kd=x.unstable_LowPriority,ja=x.unstable_IdlePriority,Mr=null,mt=null;function Nd(e){if(mt&&typeof mt.onCommitFiberRoot=="function")try{mt.onCommitFiberRoot(Mr,e,void 0,(e.current.flags&128)===128)}catch{}}var ot=Math.clz32?Math.clz32:zd,jd=Math.log,Td=Math.LN2;function zd(e){return e>>>=0,e===0?32:31-(jd(e)/Td|0)|0}var Or=64,Br=4194304;function Wn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Dr(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,a=n&268435455;if(a!==0){var s=a&~l;s!==0?r=Wn(s):(o&=a,o!==0&&(r=Wn(o)))}else a=n&~l,a!==0?r=Wn(a):o!==0&&(r=Wn(o));if(r===0)return 0;if(t!==0&&t!==r&&(t&l)===0&&(l=r&-r,o=t&-t,l>=o||l===16&&(o&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-ot(t),l=1<<n,r|=e[n],t&=~l;return r}function Ed(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Id(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var a=31-ot(o),s=1<<a,d=l[a];d===-1?((s&n)===0||(s&r)!==0)&&(l[a]=Ed(s,t)):d<=t&&(e.expiredLanes|=s),o&=~s}}function io(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ta(){var e=Or;return Or<<=1,(Or&4194240)===0&&(Or=64),e}function ao(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function $n(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-ot(t),e[t]=n}function Ad(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-ot(n),o=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~o}}function so(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ot(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var X=0;function za(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Ea,co,Ia,Aa,Fa,uo=!1,Hr=[],At=null,Ft=null,_t=null,Qn=new Map,Zn=new Map,Lt=[],Fd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function _a(e,t){switch(e){case"focusin":case"focusout":At=null;break;case"dragenter":case"dragleave":Ft=null;break;case"mouseover":case"mouseout":_t=null;break;case"pointerover":case"pointerout":Qn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Zn.delete(t.pointerId)}}function qn(e,t,n,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},t!==null&&(t=dr(t),t!==null&&co(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function _d(e,t,n,r,l){switch(t){case"focusin":return At=qn(At,e,t,n,r,l),!0;case"dragenter":return Ft=qn(Ft,e,t,n,r,l),!0;case"mouseover":return _t=qn(_t,e,t,n,r,l),!0;case"pointerover":var o=l.pointerId;return Qn.set(o,qn(Qn.get(o)||null,e,t,n,r,l)),!0;case"gotpointercapture":return o=l.pointerId,Zn.set(o,qn(Zn.get(o)||null,e,t,n,r,l)),!0}return!1}function La(e){var t=Yt(e.target);if(t!==null){var n=Xt(t);if(n!==null){if(t=n.tag,t===13){if(t=ya(n),t!==null){e.blockedOn=t,Fa(e.priority,function(){Ia(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Vr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=fo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Jl=r,n.target.dispatchEvent(r),Jl=null}else return t=dr(n),t!==null&&co(t),e.blockedOn=n,!1;t.shift()}return!0}function Pa(e,t,n){Vr(e)&&n.delete(t)}function Ld(){uo=!1,At!==null&&Vr(At)&&(At=null),Ft!==null&&Vr(Ft)&&(Ft=null),_t!==null&&Vr(_t)&&(_t=null),Qn.forEach(Pa),Zn.forEach(Pa)}function Xn(e,t){e.blockedOn===t&&(e.blockedOn=null,uo||(uo=!0,x.unstable_scheduleCallback(x.unstable_NormalPriority,Ld)))}function Yn(e){function t(l){return Xn(l,e)}if(0<Hr.length){Xn(Hr[0],e);for(var n=1;n<Hr.length;n++){var r=Hr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(At!==null&&Xn(At,e),Ft!==null&&Xn(Ft,e),_t!==null&&Xn(_t,e),Qn.forEach(t),Zn.forEach(t),n=0;n<Lt.length;n++)r=Lt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Lt.length&&(n=Lt[0],n.blockedOn===null);)La(n),n.blockedOn===null&&Lt.shift()}var gn=Ne.ReactCurrentBatchConfig,Kr=!0;function Pd(e,t,n,r){var l=X,o=gn.transition;gn.transition=null;try{X=1,po(e,t,n,r)}finally{X=l,gn.transition=o}}function Rd(e,t,n,r){var l=X,o=gn.transition;gn.transition=null;try{X=4,po(e,t,n,r)}finally{X=l,gn.transition=o}}function po(e,t,n,r){if(Kr){var l=fo(e,t,n,r);if(l===null)Io(e,t,r,Ur,n),_a(e,r);else if(_d(l,e,t,n,r))r.stopPropagation();else if(_a(e,r),t&4&&-1<Fd.indexOf(e)){for(;l!==null;){var o=dr(l);if(o!==null&&Ea(o),o=fo(e,t,n,r),o===null&&Io(e,t,r,Ur,n),o===l)break;l=o}l!==null&&r.stopPropagation()}else Io(e,t,r,null,n)}}var Ur=null;function fo(e,t,n,r){if(Ur=null,e=eo(r),e=Yt(e),e!==null)if(t=Xt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ya(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ur=e,null}function Ra(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Cd()){case oo:return 1;case Na:return 4;case Rr:case kd:return 16;case ja:return 536870912;default:return 16}default:return 16}}var Pt=null,mo=null,Gr=null;function Ma(){if(Gr)return Gr;var e,t=mo,n=t.length,r,l="value"in Pt?Pt.value:Pt.textContent,o=l.length;for(e=0;e<n&&t[e]===l[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===l[o-r];r++);return Gr=l.slice(e,1<r?1-r:void 0)}function Wr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function $r(){return!0}function Oa(){return!1}function Ge(e){function t(n,r,l,o,a){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=a,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(o):o[s]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?$r:Oa,this.isPropagationStopped=Oa,this}return E(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=$r)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=$r)},persist:function(){},isPersistent:$r}),t}var hn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},go=Ge(hn),Jn=E({},hn,{view:0,detail:0}),Md=Ge(Jn),ho,xo,er,Qr=E({},Jn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:yo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==er&&(er&&e.type==="mousemove"?(ho=e.screenX-er.screenX,xo=e.screenY-er.screenY):xo=ho=0,er=e),ho)},movementY:function(e){return"movementY"in e?e.movementY:xo}}),Ba=Ge(Qr),Od=E({},Qr,{dataTransfer:0}),Bd=Ge(Od),Dd=E({},Jn,{relatedTarget:0}),vo=Ge(Dd),Hd=E({},hn,{animationName:0,elapsedTime:0,pseudoElement:0}),Vd=Ge(Hd),Kd=E({},hn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ud=Ge(Kd),Gd=E({},hn,{data:0}),Da=Ge(Gd),Wd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},$d={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Qd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Zd(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Qd[e])?!!t[e]:!1}function yo(){return Zd}var qd=E({},Jn,{key:function(e){if(e.key){var t=Wd[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Wr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?$d[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:yo,charCode:function(e){return e.type==="keypress"?Wr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Wr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Xd=Ge(qd),Yd=E({},Qr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ha=Ge(Yd),Jd=E({},Jn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:yo}),eu=Ge(Jd),tu=E({},hn,{propertyName:0,elapsedTime:0,pseudoElement:0}),nu=Ge(tu),ru=E({},Qr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),lu=Ge(ru),ou=[9,13,27,32],wo=H&&"CompositionEvent"in window,tr=null;H&&"documentMode"in document&&(tr=document.documentMode);var iu=H&&"TextEvent"in window&&!tr,Va=H&&(!wo||tr&&8<tr&&11>=tr),Ka=" ",Ua=!1;function Ga(e,t){switch(e){case"keyup":return ou.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Wa(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var xn=!1;function au(e,t){switch(e){case"compositionend":return Wa(t);case"keypress":return t.which!==32?null:(Ua=!0,Ka);case"textInput":return e=t.data,e===Ka&&Ua?null:e;default:return null}}function su(e,t){if(xn)return e==="compositionend"||!wo&&Ga(e,t)?(e=Ma(),Gr=mo=Pt=null,xn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Va&&t.locale!=="ko"?null:t.data;default:return null}}var cu={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function $a(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!cu[e.type]:t==="textarea"}function Qa(e,t,n,r){ma(r),t=Jr(t,"onChange"),0<t.length&&(n=new go("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var nr=null,rr=null;function du(e){ps(e,0)}function Zr(e){var t=Sn(e);if(na(t))return e}function uu(e,t){if(e==="change")return t}var Za=!1;if(H){var bo;if(H){var So="oninput"in document;if(!So){var qa=document.createElement("div");qa.setAttribute("oninput","return;"),So=typeof qa.oninput=="function"}bo=So}else bo=!1;Za=bo&&(!document.documentMode||9<document.documentMode)}function Xa(){nr&&(nr.detachEvent("onpropertychange",Ya),rr=nr=null)}function Ya(e){if(e.propertyName==="value"&&Zr(rr)){var t=[];Qa(t,rr,e,eo(e)),va(du,t)}}function pu(e,t,n){e==="focusin"?(Xa(),nr=t,rr=n,nr.attachEvent("onpropertychange",Ya)):e==="focusout"&&Xa()}function fu(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Zr(rr)}function mu(e,t){if(e==="click")return Zr(t)}function gu(e,t){if(e==="input"||e==="change")return Zr(t)}function hu(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var it=typeof Object.is=="function"?Object.is:hu;function lr(e,t){if(it(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!K.call(t,l)||!it(e[l],t[l]))return!1}return!0}function Ja(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function es(e,t){var n=Ja(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ja(n)}}function ts(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ts(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ns(){for(var e=window,t=Fr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Fr(e.document)}return t}function Co(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function xu(e){var t=ns(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&ts(n.ownerDocument.documentElement,n)){if(r!==null&&Co(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=es(n,o);var a=es(n,r);l&&a&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var vu=H&&"documentMode"in document&&11>=document.documentMode,vn=null,ko=null,or=null,No=!1;function rs(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;No||vn==null||vn!==Fr(r)||(r=vn,"selectionStart"in r&&Co(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),or&&lr(or,r)||(or=r,r=Jr(ko,"onSelect"),0<r.length&&(t=new go("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=vn)))}function qr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var yn={animationend:qr("Animation","AnimationEnd"),animationiteration:qr("Animation","AnimationIteration"),animationstart:qr("Animation","AnimationStart"),transitionend:qr("Transition","TransitionEnd")},jo={},ls={};H&&(ls=document.createElement("div").style,"AnimationEvent"in window||(delete yn.animationend.animation,delete yn.animationiteration.animation,delete yn.animationstart.animation),"TransitionEvent"in window||delete yn.transitionend.transition);function Xr(e){if(jo[e])return jo[e];if(!yn[e])return e;var t=yn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ls)return jo[e]=t[n];return e}var os=Xr("animationend"),is=Xr("animationiteration"),as=Xr("animationstart"),ss=Xr("transitionend"),cs=new Map,ds="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Rt(e,t){cs.set(e,t),C(t,[e])}for(var To=0;To<ds.length;To++){var zo=ds[To],yu=zo.toLowerCase(),wu=zo[0].toUpperCase()+zo.slice(1);Rt(yu,"on"+wu)}Rt(os,"onAnimationEnd"),Rt(is,"onAnimationIteration"),Rt(as,"onAnimationStart"),Rt("dblclick","onDoubleClick"),Rt("focusin","onFocus"),Rt("focusout","onBlur"),Rt(ss,"onTransitionEnd"),F("onMouseEnter",["mouseout","mouseover"]),F("onMouseLeave",["mouseout","mouseover"]),F("onPointerEnter",["pointerout","pointerover"]),F("onPointerLeave",["pointerout","pointerover"]),C("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),C("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),C("onBeforeInput",["compositionend","keypress","textInput","paste"]),C("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),C("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),C("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ir="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bu=new Set("cancel close invalid load scroll toggle".split(" ").concat(ir));function us(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,yd(r,t,void 0,e),e.currentTarget=null}function ps(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var a=r.length-1;0<=a;a--){var s=r[a],d=s.instance,h=s.currentTarget;if(s=s.listener,d!==o&&l.isPropagationStopped())break e;us(l,s,h),o=d}else for(a=0;a<r.length;a++){if(s=r[a],d=s.instance,h=s.currentTarget,s=s.listener,d!==o&&l.isPropagationStopped())break e;us(l,s,h),o=d}}}if(Pr)throw e=lo,Pr=!1,lo=null,e}function oe(e,t){var n=t[Ro];n===void 0&&(n=t[Ro]=new Set);var r=e+"__bubble";n.has(r)||(fs(t,e,2,!1),n.add(r))}function Eo(e,t,n){var r=0;t&&(r|=4),fs(n,e,r,t)}var Yr="_reactListening"+Math.random().toString(36).slice(2);function ar(e){if(!e[Yr]){e[Yr]=!0,T.forEach(function(n){n!=="selectionchange"&&(bu.has(n)||Eo(n,!1,e),Eo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Yr]||(t[Yr]=!0,Eo("selectionchange",!1,t))}}function fs(e,t,n,r){switch(Ra(t)){case 1:var l=Pd;break;case 4:l=Rd;break;default:l=po}n=l.bind(null,t,n,e),l=void 0,!ro||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function Io(e,t,n,r,l){var o=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var s=r.stateNode.containerInfo;if(s===l||s.nodeType===8&&s.parentNode===l)break;if(a===4)for(a=r.return;a!==null;){var d=a.tag;if((d===3||d===4)&&(d=a.stateNode.containerInfo,d===l||d.nodeType===8&&d.parentNode===l))return;a=a.return}for(;s!==null;){if(a=Yt(s),a===null)return;if(d=a.tag,d===5||d===6){r=o=a;continue e}s=s.parentNode}}r=r.return}va(function(){var h=o,w=eo(n),b=[];e:{var v=cs.get(e);if(v!==void 0){var N=go,I=e;switch(e){case"keypress":if(Wr(n)===0)break e;case"keydown":case"keyup":N=Xd;break;case"focusin":I="focus",N=vo;break;case"focusout":I="blur",N=vo;break;case"beforeblur":case"afterblur":N=vo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":N=Ba;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":N=Bd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":N=eu;break;case os:case is:case as:N=Vd;break;case ss:N=nu;break;case"scroll":N=Md;break;case"wheel":N=lu;break;case"copy":case"cut":case"paste":N=Ud;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":N=Ha}var A=(t&4)!==0,ge=!A&&e==="scroll",m=A?v!==null?v+"Capture":null:v;A=[];for(var u=h,g;u!==null;){g=u;var S=g.stateNode;if(g.tag===5&&S!==null&&(g=S,m!==null&&(S=Kn(u,m),S!=null&&A.push(sr(u,S,g)))),ge)break;u=u.return}0<A.length&&(v=new N(v,I,null,n,w),b.push({event:v,listeners:A}))}}if((t&7)===0){e:{if(v=e==="mouseover"||e==="pointerover",N=e==="mouseout"||e==="pointerout",v&&n!==Jl&&(I=n.relatedTarget||n.fromElement)&&(Yt(I)||I[bt]))break e;if((N||v)&&(v=w.window===w?w:(v=w.ownerDocument)?v.defaultView||v.parentWindow:window,N?(I=n.relatedTarget||n.toElement,N=h,I=I?Yt(I):null,I!==null&&(ge=Xt(I),I!==ge||I.tag!==5&&I.tag!==6)&&(I=null)):(N=null,I=h),N!==I)){if(A=Ba,S="onMouseLeave",m="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(A=Ha,S="onPointerLeave",m="onPointerEnter",u="pointer"),ge=N==null?v:Sn(N),g=I==null?v:Sn(I),v=new A(S,u+"leave",N,n,w),v.target=ge,v.relatedTarget=g,S=null,Yt(w)===h&&(A=new A(m,u+"enter",I,n,w),A.target=g,A.relatedTarget=ge,S=A),ge=S,N&&I)t:{for(A=N,m=I,u=0,g=A;g;g=wn(g))u++;for(g=0,S=m;S;S=wn(S))g++;for(;0<u-g;)A=wn(A),u--;for(;0<g-u;)m=wn(m),g--;for(;u--;){if(A===m||m!==null&&A===m.alternate)break t;A=wn(A),m=wn(m)}A=null}else A=null;N!==null&&ms(b,v,N,A,!1),I!==null&&ge!==null&&ms(b,ge,I,A,!0)}}e:{if(v=h?Sn(h):window,N=v.nodeName&&v.nodeName.toLowerCase(),N==="select"||N==="input"&&v.type==="file")var _=uu;else if($a(v))if(Za)_=gu;else{_=fu;var R=pu}else(N=v.nodeName)&&N.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(_=mu);if(_&&(_=_(e,h))){Qa(b,_,n,w);break e}R&&R(e,v,h),e==="focusout"&&(R=v._wrapperState)&&R.controlled&&v.type==="number"&&Ql(v,"number",v.value)}switch(R=h?Sn(h):window,e){case"focusin":($a(R)||R.contentEditable==="true")&&(vn=R,ko=h,or=null);break;case"focusout":or=ko=vn=null;break;case"mousedown":No=!0;break;case"contextmenu":case"mouseup":case"dragend":No=!1,rs(b,n,w);break;case"selectionchange":if(vu)break;case"keydown":case"keyup":rs(b,n,w)}var M;if(wo)e:{switch(e){case"compositionstart":var B="onCompositionStart";break e;case"compositionend":B="onCompositionEnd";break e;case"compositionupdate":B="onCompositionUpdate";break e}B=void 0}else xn?Ga(e,n)&&(B="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(B="onCompositionStart");B&&(Va&&n.locale!=="ko"&&(xn||B!=="onCompositionStart"?B==="onCompositionEnd"&&xn&&(M=Ma()):(Pt=w,mo="value"in Pt?Pt.value:Pt.textContent,xn=!0)),R=Jr(h,B),0<R.length&&(B=new Da(B,e,null,n,w),b.push({event:B,listeners:R}),M?B.data=M:(M=Wa(n),M!==null&&(B.data=M)))),(M=iu?au(e,n):su(e,n))&&(h=Jr(h,"onBeforeInput"),0<h.length&&(w=new Da("onBeforeInput","beforeinput",null,n,w),b.push({event:w,listeners:h}),w.data=M))}ps(b,t)})}function sr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Jr(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=Kn(e,n),o!=null&&r.unshift(sr(e,o,l)),o=Kn(e,t),o!=null&&r.push(sr(e,o,l))),e=e.return}return r}function wn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ms(e,t,n,r,l){for(var o=t._reactName,a=[];n!==null&&n!==r;){var s=n,d=s.alternate,h=s.stateNode;if(d!==null&&d===r)break;s.tag===5&&h!==null&&(s=h,l?(d=Kn(n,o),d!=null&&a.unshift(sr(n,d,s))):l||(d=Kn(n,o),d!=null&&a.push(sr(n,d,s)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var Su=/\r\n?/g,Cu=/\u0000|\uFFFD/g;function gs(e){return(typeof e=="string"?e:""+e).replace(Su,`
`).replace(Cu,"")}function el(e,t,n){if(t=gs(t),gs(e)!==t&&n)throw Error(p(425))}function tl(){}var Ao=null,Fo=null;function _o(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Lo=typeof setTimeout=="function"?setTimeout:void 0,ku=typeof clearTimeout=="function"?clearTimeout:void 0,hs=typeof Promise=="function"?Promise:void 0,Nu=typeof queueMicrotask=="function"?queueMicrotask:typeof hs<"u"?function(e){return hs.resolve(null).then(e).catch(ju)}:Lo;function ju(e){setTimeout(function(){throw e})}function Po(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),Yn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);Yn(t)}function Mt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function xs(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var bn=Math.random().toString(36).slice(2),gt="__reactFiber$"+bn,cr="__reactProps$"+bn,bt="__reactContainer$"+bn,Ro="__reactEvents$"+bn,Tu="__reactListeners$"+bn,zu="__reactHandles$"+bn;function Yt(e){var t=e[gt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[bt]||n[gt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=xs(e);e!==null;){if(n=e[gt])return n;e=xs(e)}return t}e=n,n=e.parentNode}return null}function dr(e){return e=e[gt]||e[bt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Sn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(p(33))}function nl(e){return e[cr]||null}var Mo=[],Cn=-1;function Ot(e){return{current:e}}function ie(e){0>Cn||(e.current=Mo[Cn],Mo[Cn]=null,Cn--)}function te(e,t){Cn++,Mo[Cn]=e.current,e.current=t}var Bt={},je=Ot(Bt),Re=Ot(!1),Jt=Bt;function kn(e,t){var n=e.type.contextTypes;if(!n)return Bt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in n)l[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function Me(e){return e=e.childContextTypes,e!=null}function rl(){ie(Re),ie(je)}function vs(e,t,n){if(je.current!==Bt)throw Error(p(168));te(je,t),te(Re,n)}function ys(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(p(108,ee(e)||"Unknown",l));return E({},n,r)}function ll(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Bt,Jt=je.current,te(je,e),te(Re,Re.current),!0}function ws(e,t,n){var r=e.stateNode;if(!r)throw Error(p(169));n?(e=ys(e,t,Jt),r.__reactInternalMemoizedMergedChildContext=e,ie(Re),ie(je),te(je,e)):ie(Re),te(Re,n)}var St=null,ol=!1,Oo=!1;function bs(e){St===null?St=[e]:St.push(e)}function Eu(e){ol=!0,bs(e)}function Dt(){if(!Oo&&St!==null){Oo=!0;var e=0,t=X;try{var n=St;for(X=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}St=null,ol=!1}catch(l){throw St!==null&&(St=St.slice(e+1)),Ca(oo,Dt),l}finally{X=t,Oo=!1}}return null}var Nn=[],jn=0,il=null,al=0,Xe=[],Ye=0,en=null,Ct=1,kt="";function tn(e,t){Nn[jn++]=al,Nn[jn++]=il,il=e,al=t}function Ss(e,t,n){Xe[Ye++]=Ct,Xe[Ye++]=kt,Xe[Ye++]=en,en=e;var r=Ct;e=kt;var l=32-ot(r)-1;r&=~(1<<l),n+=1;var o=32-ot(t)+l;if(30<o){var a=l-l%5;o=(r&(1<<a)-1).toString(32),r>>=a,l-=a,Ct=1<<32-ot(t)+l|n<<l|r,kt=o+e}else Ct=1<<o|n<<l|r,kt=e}function Bo(e){e.return!==null&&(tn(e,1),Ss(e,1,0))}function Do(e){for(;e===il;)il=Nn[--jn],Nn[jn]=null,al=Nn[--jn],Nn[jn]=null;for(;e===en;)en=Xe[--Ye],Xe[Ye]=null,kt=Xe[--Ye],Xe[Ye]=null,Ct=Xe[--Ye],Xe[Ye]=null}var We=null,$e=null,ce=!1,at=null;function Cs(e,t){var n=nt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function ks(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,We=e,$e=Mt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,We=e,$e=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=en!==null?{id:Ct,overflow:kt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=nt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,We=e,$e=null,!0):!1;default:return!1}}function Ho(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Vo(e){if(ce){var t=$e;if(t){var n=t;if(!ks(e,t)){if(Ho(e))throw Error(p(418));t=Mt(n.nextSibling);var r=We;t&&ks(e,t)?Cs(r,n):(e.flags=e.flags&-4097|2,ce=!1,We=e)}}else{if(Ho(e))throw Error(p(418));e.flags=e.flags&-4097|2,ce=!1,We=e}}}function Ns(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;We=e}function sl(e){if(e!==We)return!1;if(!ce)return Ns(e),ce=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!_o(e.type,e.memoizedProps)),t&&(t=$e)){if(Ho(e))throw js(),Error(p(418));for(;t;)Cs(e,t),t=Mt(t.nextSibling)}if(Ns(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(p(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){$e=Mt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}$e=null}}else $e=We?Mt(e.stateNode.nextSibling):null;return!0}function js(){for(var e=$e;e;)e=Mt(e.nextSibling)}function Tn(){$e=We=null,ce=!1}function Ko(e){at===null?at=[e]:at.push(e)}var Iu=Ne.ReactCurrentBatchConfig;function ur(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(p(309));var r=n.stateNode}if(!r)throw Error(p(147,e));var l=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(a){var s=l.refs;a===null?delete s[o]:s[o]=a},t._stringRef=o,t)}if(typeof e!="string")throw Error(p(284));if(!n._owner)throw Error(p(290,e))}return e}function cl(e,t){throw e=Object.prototype.toString.call(t),Error(p(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ts(e){var t=e._init;return t(e._payload)}function zs(e){function t(m,u){if(e){var g=m.deletions;g===null?(m.deletions=[u],m.flags|=16):g.push(u)}}function n(m,u){if(!e)return null;for(;u!==null;)t(m,u),u=u.sibling;return null}function r(m,u){for(m=new Map;u!==null;)u.key!==null?m.set(u.key,u):m.set(u.index,u),u=u.sibling;return m}function l(m,u){return m=Qt(m,u),m.index=0,m.sibling=null,m}function o(m,u,g){return m.index=g,e?(g=m.alternate,g!==null?(g=g.index,g<u?(m.flags|=2,u):g):(m.flags|=2,u)):(m.flags|=1048576,u)}function a(m){return e&&m.alternate===null&&(m.flags|=2),m}function s(m,u,g,S){return u===null||u.tag!==6?(u=Li(g,m.mode,S),u.return=m,u):(u=l(u,g),u.return=m,u)}function d(m,u,g,S){var _=g.type;return _===Le?w(m,u,g.props.children,S,g.key):u!==null&&(u.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===Pe&&Ts(_)===u.type)?(S=l(u,g.props),S.ref=ur(m,u,g),S.return=m,S):(S=_l(g.type,g.key,g.props,null,m.mode,S),S.ref=ur(m,u,g),S.return=m,S)}function h(m,u,g,S){return u===null||u.tag!==4||u.stateNode.containerInfo!==g.containerInfo||u.stateNode.implementation!==g.implementation?(u=Pi(g,m.mode,S),u.return=m,u):(u=l(u,g.children||[]),u.return=m,u)}function w(m,u,g,S,_){return u===null||u.tag!==7?(u=dn(g,m.mode,S,_),u.return=m,u):(u=l(u,g),u.return=m,u)}function b(m,u,g){if(typeof u=="string"&&u!==""||typeof u=="number")return u=Li(""+u,m.mode,g),u.return=m,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case rt:return g=_l(u.type,u.key,u.props,null,m.mode,g),g.ref=ur(m,null,u),g.return=m,g;case Ae:return u=Pi(u,m.mode,g),u.return=m,u;case Pe:var S=u._init;return b(m,S(u._payload),g)}if(Dn(u)||O(u))return u=dn(u,m.mode,g,null),u.return=m,u;cl(m,u)}return null}function v(m,u,g,S){var _=u!==null?u.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return _!==null?null:s(m,u,""+g,S);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case rt:return g.key===_?d(m,u,g,S):null;case Ae:return g.key===_?h(m,u,g,S):null;case Pe:return _=g._init,v(m,u,_(g._payload),S)}if(Dn(g)||O(g))return _!==null?null:w(m,u,g,S,null);cl(m,g)}return null}function N(m,u,g,S,_){if(typeof S=="string"&&S!==""||typeof S=="number")return m=m.get(g)||null,s(u,m,""+S,_);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case rt:return m=m.get(S.key===null?g:S.key)||null,d(u,m,S,_);case Ae:return m=m.get(S.key===null?g:S.key)||null,h(u,m,S,_);case Pe:var R=S._init;return N(m,u,g,R(S._payload),_)}if(Dn(S)||O(S))return m=m.get(g)||null,w(u,m,S,_,null);cl(u,S)}return null}function I(m,u,g,S){for(var _=null,R=null,M=u,B=u=0,Se=null;M!==null&&B<g.length;B++){M.index>B?(Se=M,M=null):Se=M.sibling;var Q=v(m,M,g[B],S);if(Q===null){M===null&&(M=Se);break}e&&M&&Q.alternate===null&&t(m,M),u=o(Q,u,B),R===null?_=Q:R.sibling=Q,R=Q,M=Se}if(B===g.length)return n(m,M),ce&&tn(m,B),_;if(M===null){for(;B<g.length;B++)M=b(m,g[B],S),M!==null&&(u=o(M,u,B),R===null?_=M:R.sibling=M,R=M);return ce&&tn(m,B),_}for(M=r(m,M);B<g.length;B++)Se=N(M,m,B,g[B],S),Se!==null&&(e&&Se.alternate!==null&&M.delete(Se.key===null?B:Se.key),u=o(Se,u,B),R===null?_=Se:R.sibling=Se,R=Se);return e&&M.forEach(function(Zt){return t(m,Zt)}),ce&&tn(m,B),_}function A(m,u,g,S){var _=O(g);if(typeof _!="function")throw Error(p(150));if(g=_.call(g),g==null)throw Error(p(151));for(var R=_=null,M=u,B=u=0,Se=null,Q=g.next();M!==null&&!Q.done;B++,Q=g.next()){M.index>B?(Se=M,M=null):Se=M.sibling;var Zt=v(m,M,Q.value,S);if(Zt===null){M===null&&(M=Se);break}e&&M&&Zt.alternate===null&&t(m,M),u=o(Zt,u,B),R===null?_=Zt:R.sibling=Zt,R=Zt,M=Se}if(Q.done)return n(m,M),ce&&tn(m,B),_;if(M===null){for(;!Q.done;B++,Q=g.next())Q=b(m,Q.value,S),Q!==null&&(u=o(Q,u,B),R===null?_=Q:R.sibling=Q,R=Q);return ce&&tn(m,B),_}for(M=r(m,M);!Q.done;B++,Q=g.next())Q=N(M,m,B,Q.value,S),Q!==null&&(e&&Q.alternate!==null&&M.delete(Q.key===null?B:Q.key),u=o(Q,u,B),R===null?_=Q:R.sibling=Q,R=Q);return e&&M.forEach(function(cp){return t(m,cp)}),ce&&tn(m,B),_}function ge(m,u,g,S){if(typeof g=="object"&&g!==null&&g.type===Le&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case rt:e:{for(var _=g.key,R=u;R!==null;){if(R.key===_){if(_=g.type,_===Le){if(R.tag===7){n(m,R.sibling),u=l(R,g.props.children),u.return=m,m=u;break e}}else if(R.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===Pe&&Ts(_)===R.type){n(m,R.sibling),u=l(R,g.props),u.ref=ur(m,R,g),u.return=m,m=u;break e}n(m,R);break}else t(m,R);R=R.sibling}g.type===Le?(u=dn(g.props.children,m.mode,S,g.key),u.return=m,m=u):(S=_l(g.type,g.key,g.props,null,m.mode,S),S.ref=ur(m,u,g),S.return=m,m=S)}return a(m);case Ae:e:{for(R=g.key;u!==null;){if(u.key===R)if(u.tag===4&&u.stateNode.containerInfo===g.containerInfo&&u.stateNode.implementation===g.implementation){n(m,u.sibling),u=l(u,g.children||[]),u.return=m,m=u;break e}else{n(m,u);break}else t(m,u);u=u.sibling}u=Pi(g,m.mode,S),u.return=m,m=u}return a(m);case Pe:return R=g._init,ge(m,u,R(g._payload),S)}if(Dn(g))return I(m,u,g,S);if(O(g))return A(m,u,g,S);cl(m,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,u!==null&&u.tag===6?(n(m,u.sibling),u=l(u,g),u.return=m,m=u):(n(m,u),u=Li(g,m.mode,S),u.return=m,m=u),a(m)):n(m,u)}return ge}var zn=zs(!0),Es=zs(!1),dl=Ot(null),ul=null,En=null,Uo=null;function Go(){Uo=En=ul=null}function Wo(e){var t=dl.current;ie(dl),e._currentValue=t}function $o(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function In(e,t){ul=e,Uo=En=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Oe=!0),e.firstContext=null)}function Je(e){var t=e._currentValue;if(Uo!==e)if(e={context:e,memoizedValue:t,next:null},En===null){if(ul===null)throw Error(p(308));En=e,ul.dependencies={lanes:0,firstContext:e}}else En=En.next=e;return t}var nn=null;function Qo(e){nn===null?nn=[e]:nn.push(e)}function Is(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,Qo(t)):(n.next=l.next,l.next=n),t.interleaved=n,Nt(e,r)}function Nt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Ht=!1;function Zo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function As(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function jt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Vt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(G&2)!==0){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,Nt(e,n)}return l=r.interleaved,l===null?(t.next=t,Qo(r)):(t.next=l.next,l.next=t),r.interleaved=t,Nt(e,n)}function pl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,so(e,n)}}function Fs(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?l=o=a:o=o.next=a,n=n.next}while(n!==null);o===null?l=o=t:o=o.next=t}else l=o=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function fl(e,t,n,r){var l=e.updateQueue;Ht=!1;var o=l.firstBaseUpdate,a=l.lastBaseUpdate,s=l.shared.pending;if(s!==null){l.shared.pending=null;var d=s,h=d.next;d.next=null,a===null?o=h:a.next=h,a=d;var w=e.alternate;w!==null&&(w=w.updateQueue,s=w.lastBaseUpdate,s!==a&&(s===null?w.firstBaseUpdate=h:s.next=h,w.lastBaseUpdate=d))}if(o!==null){var b=l.baseState;a=0,w=h=d=null,s=o;do{var v=s.lane,N=s.eventTime;if((r&v)===v){w!==null&&(w=w.next={eventTime:N,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var I=e,A=s;switch(v=t,N=n,A.tag){case 1:if(I=A.payload,typeof I=="function"){b=I.call(N,b,v);break e}b=I;break e;case 3:I.flags=I.flags&-65537|128;case 0:if(I=A.payload,v=typeof I=="function"?I.call(N,b,v):I,v==null)break e;b=E({},b,v);break e;case 2:Ht=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,v=l.effects,v===null?l.effects=[s]:v.push(s))}else N={eventTime:N,lane:v,tag:s.tag,payload:s.payload,callback:s.callback,next:null},w===null?(h=w=N,d=b):w=w.next=N,a|=v;if(s=s.next,s===null){if(s=l.shared.pending,s===null)break;v=s,s=v.next,v.next=null,l.lastBaseUpdate=v,l.shared.pending=null}}while(!0);if(w===null&&(d=b),l.baseState=d,l.firstBaseUpdate=h,l.lastBaseUpdate=w,t=l.shared.interleaved,t!==null){l=t;do a|=l.lane,l=l.next;while(l!==t)}else o===null&&(l.shared.lanes=0);on|=a,e.lanes=a,e.memoizedState=b}}function _s(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(p(191,l));l.call(r)}}}var pr={},ht=Ot(pr),fr=Ot(pr),mr=Ot(pr);function rn(e){if(e===pr)throw Error(p(174));return e}function qo(e,t){switch(te(mr,t),te(fr,e),te(ht,pr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:ql(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=ql(t,e)}ie(ht),te(ht,t)}function An(){ie(ht),ie(fr),ie(mr)}function Ls(e){rn(mr.current);var t=rn(ht.current),n=ql(t,e.type);t!==n&&(te(fr,e),te(ht,n))}function Xo(e){fr.current===e&&(ie(ht),ie(fr))}var de=Ot(0);function ml(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Yo=[];function Jo(){for(var e=0;e<Yo.length;e++)Yo[e]._workInProgressVersionPrimary=null;Yo.length=0}var gl=Ne.ReactCurrentDispatcher,ei=Ne.ReactCurrentBatchConfig,ln=0,ue=null,ve=null,we=null,hl=!1,gr=!1,hr=0,Au=0;function Te(){throw Error(p(321))}function ti(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!it(e[n],t[n]))return!1;return!0}function ni(e,t,n,r,l,o){if(ln=o,ue=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,gl.current=e===null||e.memoizedState===null?Pu:Ru,e=n(r,l),gr){o=0;do{if(gr=!1,hr=0,25<=o)throw Error(p(301));o+=1,we=ve=null,t.updateQueue=null,gl.current=Mu,e=n(r,l)}while(gr)}if(gl.current=yl,t=ve!==null&&ve.next!==null,ln=0,we=ve=ue=null,hl=!1,t)throw Error(p(300));return e}function ri(){var e=hr!==0;return hr=0,e}function xt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return we===null?ue.memoizedState=we=e:we=we.next=e,we}function et(){if(ve===null){var e=ue.alternate;e=e!==null?e.memoizedState:null}else e=ve.next;var t=we===null?ue.memoizedState:we.next;if(t!==null)we=t,ve=e;else{if(e===null)throw Error(p(310));ve=e,e={memoizedState:ve.memoizedState,baseState:ve.baseState,baseQueue:ve.baseQueue,queue:ve.queue,next:null},we===null?ue.memoizedState=we=e:we=we.next=e}return we}function xr(e,t){return typeof t=="function"?t(e):t}function li(e){var t=et(),n=t.queue;if(n===null)throw Error(p(311));n.lastRenderedReducer=e;var r=ve,l=r.baseQueue,o=n.pending;if(o!==null){if(l!==null){var a=l.next;l.next=o.next,o.next=a}r.baseQueue=l=o,n.pending=null}if(l!==null){o=l.next,r=r.baseState;var s=a=null,d=null,h=o;do{var w=h.lane;if((ln&w)===w)d!==null&&(d=d.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:e(r,h.action);else{var b={lane:w,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};d===null?(s=d=b,a=r):d=d.next=b,ue.lanes|=w,on|=w}h=h.next}while(h!==null&&h!==o);d===null?a=r:d.next=s,it(r,t.memoizedState)||(Oe=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=d,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do o=l.lane,ue.lanes|=o,on|=o,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function oi(e){var t=et(),n=t.queue;if(n===null)throw Error(p(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,o=t.memoizedState;if(l!==null){n.pending=null;var a=l=l.next;do o=e(o,a.action),a=a.next;while(a!==l);it(o,t.memoizedState)||(Oe=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Ps(){}function Rs(e,t){var n=ue,r=et(),l=t(),o=!it(r.memoizedState,l);if(o&&(r.memoizedState=l,Oe=!0),r=r.queue,ii(Bs.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||we!==null&&we.memoizedState.tag&1){if(n.flags|=2048,vr(9,Os.bind(null,n,r,l,t),void 0,null),be===null)throw Error(p(349));(ln&30)!==0||Ms(n,t,l)}return l}function Ms(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ue.updateQueue,t===null?(t={lastEffect:null,stores:null},ue.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Os(e,t,n,r){t.value=n,t.getSnapshot=r,Ds(t)&&Hs(e)}function Bs(e,t,n){return n(function(){Ds(t)&&Hs(e)})}function Ds(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!it(e,n)}catch{return!0}}function Hs(e){var t=Nt(e,1);t!==null&&ut(t,e,1,-1)}function Vs(e){var t=xt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:xr,lastRenderedState:e},t.queue=e,e=e.dispatch=Lu.bind(null,ue,e),[t.memoizedState,e]}function vr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ue.updateQueue,t===null?(t={lastEffect:null,stores:null},ue.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Ks(){return et().memoizedState}function xl(e,t,n,r){var l=xt();ue.flags|=e,l.memoizedState=vr(1|t,n,void 0,r===void 0?null:r)}function vl(e,t,n,r){var l=et();r=r===void 0?null:r;var o=void 0;if(ve!==null){var a=ve.memoizedState;if(o=a.destroy,r!==null&&ti(r,a.deps)){l.memoizedState=vr(t,n,o,r);return}}ue.flags|=e,l.memoizedState=vr(1|t,n,o,r)}function Us(e,t){return xl(8390656,8,e,t)}function ii(e,t){return vl(2048,8,e,t)}function Gs(e,t){return vl(4,2,e,t)}function Ws(e,t){return vl(4,4,e,t)}function $s(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Qs(e,t,n){return n=n!=null?n.concat([e]):null,vl(4,4,$s.bind(null,t,e),n)}function ai(){}function Zs(e,t){var n=et();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&ti(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function qs(e,t){var n=et();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&ti(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Xs(e,t,n){return(ln&21)===0?(e.baseState&&(e.baseState=!1,Oe=!0),e.memoizedState=n):(it(n,t)||(n=Ta(),ue.lanes|=n,on|=n,e.baseState=!0),t)}function Fu(e,t){var n=X;X=n!==0&&4>n?n:4,e(!0);var r=ei.transition;ei.transition={};try{e(!1),t()}finally{X=n,ei.transition=r}}function Ys(){return et().memoizedState}function _u(e,t,n){var r=Wt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Js(e))ec(t,n);else if(n=Is(e,t,n,r),n!==null){var l=_e();ut(n,e,r,l),tc(n,t,r)}}function Lu(e,t,n){var r=Wt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Js(e))ec(t,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var a=t.lastRenderedState,s=o(a,n);if(l.hasEagerState=!0,l.eagerState=s,it(s,a)){var d=t.interleaved;d===null?(l.next=l,Qo(t)):(l.next=d.next,d.next=l),t.interleaved=l;return}}catch{}finally{}n=Is(e,t,l,r),n!==null&&(l=_e(),ut(n,e,r,l),tc(n,t,r))}}function Js(e){var t=e.alternate;return e===ue||t!==null&&t===ue}function ec(e,t){gr=hl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function tc(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,so(e,n)}}var yl={readContext:Je,useCallback:Te,useContext:Te,useEffect:Te,useImperativeHandle:Te,useInsertionEffect:Te,useLayoutEffect:Te,useMemo:Te,useReducer:Te,useRef:Te,useState:Te,useDebugValue:Te,useDeferredValue:Te,useTransition:Te,useMutableSource:Te,useSyncExternalStore:Te,useId:Te,unstable_isNewReconciler:!1},Pu={readContext:Je,useCallback:function(e,t){return xt().memoizedState=[e,t===void 0?null:t],e},useContext:Je,useEffect:Us,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,xl(4194308,4,$s.bind(null,t,e),n)},useLayoutEffect:function(e,t){return xl(4194308,4,e,t)},useInsertionEffect:function(e,t){return xl(4,2,e,t)},useMemo:function(e,t){var n=xt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=xt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=_u.bind(null,ue,e),[r.memoizedState,e]},useRef:function(e){var t=xt();return e={current:e},t.memoizedState=e},useState:Vs,useDebugValue:ai,useDeferredValue:function(e){return xt().memoizedState=e},useTransition:function(){var e=Vs(!1),t=e[0];return e=Fu.bind(null,e[1]),xt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ue,l=xt();if(ce){if(n===void 0)throw Error(p(407));n=n()}else{if(n=t(),be===null)throw Error(p(349));(ln&30)!==0||Ms(r,t,n)}l.memoizedState=n;var o={value:n,getSnapshot:t};return l.queue=o,Us(Bs.bind(null,r,o,e),[e]),r.flags|=2048,vr(9,Os.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=xt(),t=be.identifierPrefix;if(ce){var n=kt,r=Ct;n=(r&~(1<<32-ot(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=hr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Au++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Ru={readContext:Je,useCallback:Zs,useContext:Je,useEffect:ii,useImperativeHandle:Qs,useInsertionEffect:Gs,useLayoutEffect:Ws,useMemo:qs,useReducer:li,useRef:Ks,useState:function(){return li(xr)},useDebugValue:ai,useDeferredValue:function(e){var t=et();return Xs(t,ve.memoizedState,e)},useTransition:function(){var e=li(xr)[0],t=et().memoizedState;return[e,t]},useMutableSource:Ps,useSyncExternalStore:Rs,useId:Ys,unstable_isNewReconciler:!1},Mu={readContext:Je,useCallback:Zs,useContext:Je,useEffect:ii,useImperativeHandle:Qs,useInsertionEffect:Gs,useLayoutEffect:Ws,useMemo:qs,useReducer:oi,useRef:Ks,useState:function(){return oi(xr)},useDebugValue:ai,useDeferredValue:function(e){var t=et();return ve===null?t.memoizedState=e:Xs(t,ve.memoizedState,e)},useTransition:function(){var e=oi(xr)[0],t=et().memoizedState;return[e,t]},useMutableSource:Ps,useSyncExternalStore:Rs,useId:Ys,unstable_isNewReconciler:!1};function st(e,t){if(e&&e.defaultProps){t=E({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function si(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:E({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var wl={isMounted:function(e){return(e=e._reactInternals)?Xt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=_e(),l=Wt(e),o=jt(r,l);o.payload=t,n!=null&&(o.callback=n),t=Vt(e,o,l),t!==null&&(ut(t,e,l,r),pl(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=_e(),l=Wt(e),o=jt(r,l);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Vt(e,o,l),t!==null&&(ut(t,e,l,r),pl(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=_e(),r=Wt(e),l=jt(n,r);l.tag=2,t!=null&&(l.callback=t),t=Vt(e,l,r),t!==null&&(ut(t,e,r,n),pl(t,e,r))}};function nc(e,t,n,r,l,o,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,a):t.prototype&&t.prototype.isPureReactComponent?!lr(n,r)||!lr(l,o):!0}function rc(e,t,n){var r=!1,l=Bt,o=t.contextType;return typeof o=="object"&&o!==null?o=Je(o):(l=Me(t)?Jt:je.current,r=t.contextTypes,o=(r=r!=null)?kn(e,l):Bt),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=wl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),t}function lc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&wl.enqueueReplaceState(t,t.state,null)}function ci(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Zo(e);var o=t.contextType;typeof o=="object"&&o!==null?l.context=Je(o):(o=Me(t)?Jt:je.current,l.context=kn(e,o)),l.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(si(e,t,o,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&wl.enqueueReplaceState(l,l.state,null),fl(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function Fn(e,t){try{var n="",r=t;do n+=W(r),r=r.return;while(r);var l=n}catch(o){l=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:l,digest:null}}function di(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ui(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Ou=typeof WeakMap=="function"?WeakMap:Map;function oc(e,t,n){n=jt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Tl||(Tl=!0,ji=r),ui(e,t)},n}function ic(e,t,n){n=jt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){ui(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){ui(e,t),typeof r!="function"&&(Ut===null?Ut=new Set([this]):Ut.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function ac(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Ou;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Yu.bind(null,e,t,n),t.then(e,e))}function sc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function cc(e,t,n,r,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=jt(-1,1),t.tag=2,Vt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var Bu=Ne.ReactCurrentOwner,Oe=!1;function Fe(e,t,n,r){t.child=e===null?Es(t,null,n,r):zn(t,e.child,n,r)}function dc(e,t,n,r,l){n=n.render;var o=t.ref;return In(t,l),r=ni(e,t,n,r,o,l),n=ri(),e!==null&&!Oe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,Tt(e,t,l)):(ce&&n&&Bo(t),t.flags|=1,Fe(e,t,r,l),t.child)}function uc(e,t,n,r,l){if(e===null){var o=n.type;return typeof o=="function"&&!_i(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,pc(e,t,o,r,l)):(e=_l(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,(e.lanes&l)===0){var a=o.memoizedProps;if(n=n.compare,n=n!==null?n:lr,n(a,r)&&e.ref===t.ref)return Tt(e,t,l)}return t.flags|=1,e=Qt(o,r),e.ref=t.ref,e.return=t,t.child=e}function pc(e,t,n,r,l){if(e!==null){var o=e.memoizedProps;if(lr(o,r)&&e.ref===t.ref)if(Oe=!1,t.pendingProps=r=o,(e.lanes&l)!==0)(e.flags&131072)!==0&&(Oe=!0);else return t.lanes=e.lanes,Tt(e,t,l)}return pi(e,t,n,r,l)}function fc(e,t,n){var r=t.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},te(Ln,Qe),Qe|=n;else{if((n&1073741824)===0)return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,te(Ln,Qe),Qe|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,te(Ln,Qe),Qe|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,te(Ln,Qe),Qe|=r;return Fe(e,t,l,n),t.child}function mc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function pi(e,t,n,r,l){var o=Me(n)?Jt:je.current;return o=kn(t,o),In(t,l),n=ni(e,t,n,r,o,l),r=ri(),e!==null&&!Oe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,Tt(e,t,l)):(ce&&r&&Bo(t),t.flags|=1,Fe(e,t,n,l),t.child)}function gc(e,t,n,r,l){if(Me(n)){var o=!0;ll(t)}else o=!1;if(In(t,l),t.stateNode===null)Sl(e,t),rc(t,n,r),ci(t,n,r,l),r=!0;else if(e===null){var a=t.stateNode,s=t.memoizedProps;a.props=s;var d=a.context,h=n.contextType;typeof h=="object"&&h!==null?h=Je(h):(h=Me(n)?Jt:je.current,h=kn(t,h));var w=n.getDerivedStateFromProps,b=typeof w=="function"||typeof a.getSnapshotBeforeUpdate=="function";b||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(s!==r||d!==h)&&lc(t,a,r,h),Ht=!1;var v=t.memoizedState;a.state=v,fl(t,r,a,l),d=t.memoizedState,s!==r||v!==d||Re.current||Ht?(typeof w=="function"&&(si(t,n,w,r),d=t.memoizedState),(s=Ht||nc(t,n,s,r,v,d,h))?(b||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=d),a.props=r,a.state=d,a.context=h,r=s):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,As(e,t),s=t.memoizedProps,h=t.type===t.elementType?s:st(t.type,s),a.props=h,b=t.pendingProps,v=a.context,d=n.contextType,typeof d=="object"&&d!==null?d=Je(d):(d=Me(n)?Jt:je.current,d=kn(t,d));var N=n.getDerivedStateFromProps;(w=typeof N=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(s!==b||v!==d)&&lc(t,a,r,d),Ht=!1,v=t.memoizedState,a.state=v,fl(t,r,a,l);var I=t.memoizedState;s!==b||v!==I||Re.current||Ht?(typeof N=="function"&&(si(t,n,N,r),I=t.memoizedState),(h=Ht||nc(t,n,h,r,v,I,d)||!1)?(w||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,I,d),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,I,d)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||s===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=I),a.props=r,a.state=I,a.context=d,r=h):(typeof a.componentDidUpdate!="function"||s===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),r=!1)}return fi(e,t,n,r,o,l)}function fi(e,t,n,r,l,o){mc(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return l&&ws(t,n,!1),Tt(e,t,o);r=t.stateNode,Bu.current=t;var s=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=zn(t,e.child,null,o),t.child=zn(t,null,s,o)):Fe(e,t,s,o),t.memoizedState=r.state,l&&ws(t,n,!0),t.child}function hc(e){var t=e.stateNode;t.pendingContext?vs(e,t.pendingContext,t.pendingContext!==t.context):t.context&&vs(e,t.context,!1),qo(e,t.containerInfo)}function xc(e,t,n,r,l){return Tn(),Ko(l),t.flags|=256,Fe(e,t,n,r),t.child}var mi={dehydrated:null,treeContext:null,retryLane:0};function gi(e){return{baseLanes:e,cachePool:null,transitions:null}}function vc(e,t,n){var r=t.pendingProps,l=de.current,o=!1,a=(t.flags&128)!==0,s;if((s=a)||(s=e!==null&&e.memoizedState===null?!1:(l&2)!==0),s?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),te(de,l&1),e===null)return Vo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(a=r.children,e=r.fallback,o?(r=t.mode,o=t.child,a={mode:"hidden",children:a},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=a):o=Ll(a,r,0,null),e=dn(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=gi(n),t.memoizedState=mi,e):hi(t,a));if(l=e.memoizedState,l!==null&&(s=l.dehydrated,s!==null))return Du(e,t,a,r,s,l,n);if(o){o=r.fallback,a=t.mode,l=e.child,s=l.sibling;var d={mode:"hidden",children:r.children};return(a&1)===0&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=d,t.deletions=null):(r=Qt(l,d),r.subtreeFlags=l.subtreeFlags&14680064),s!==null?o=Qt(s,o):(o=dn(o,a,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,a=e.child.memoizedState,a=a===null?gi(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},o.memoizedState=a,o.childLanes=e.childLanes&~n,t.memoizedState=mi,r}return o=e.child,e=o.sibling,r=Qt(o,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function hi(e,t){return t=Ll({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function bl(e,t,n,r){return r!==null&&Ko(r),zn(t,e.child,null,n),e=hi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Du(e,t,n,r,l,o,a){if(n)return t.flags&256?(t.flags&=-257,r=di(Error(p(422))),bl(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,l=t.mode,r=Ll({mode:"visible",children:r.children},l,0,null),o=dn(o,l,a,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,(t.mode&1)!==0&&zn(t,e.child,null,a),t.child.memoizedState=gi(a),t.memoizedState=mi,o);if((t.mode&1)===0)return bl(e,t,a,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var s=r.dgst;return r=s,o=Error(p(419)),r=di(o,r,void 0),bl(e,t,a,r)}if(s=(a&e.childLanes)!==0,Oe||s){if(r=be,r!==null){switch(a&-a){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|a))!==0?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,Nt(e,l),ut(r,e,l,-1))}return Fi(),r=di(Error(p(421))),bl(e,t,a,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Ju.bind(null,e),l._reactRetry=t,null):(e=o.treeContext,$e=Mt(l.nextSibling),We=t,ce=!0,at=null,e!==null&&(Xe[Ye++]=Ct,Xe[Ye++]=kt,Xe[Ye++]=en,Ct=e.id,kt=e.overflow,en=t),t=hi(t,r.children),t.flags|=4096,t)}function yc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),$o(e.return,t,n)}function xi(e,t,n,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=l)}function wc(e,t,n){var r=t.pendingProps,l=r.revealOrder,o=r.tail;if(Fe(e,t,r.children,n),r=de.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&yc(e,n,t);else if(e.tag===19)yc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(te(de,r),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&ml(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),xi(t,!1,l,n,o);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&ml(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}xi(t,!0,n,null,o);break;case"together":xi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Sl(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Tt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),on|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(p(153));if(t.child!==null){for(e=t.child,n=Qt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Qt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Hu(e,t,n){switch(t.tag){case 3:hc(t),Tn();break;case 5:Ls(t);break;case 1:Me(t.type)&&ll(t);break;case 4:qo(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;te(dl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(te(de,de.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?vc(e,t,n):(te(de,de.current&1),e=Tt(e,t,n),e!==null?e.sibling:null);te(de,de.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return wc(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),te(de,de.current),r)break;return null;case 22:case 23:return t.lanes=0,fc(e,t,n)}return Tt(e,t,n)}var bc,vi,Sc,Cc;bc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},vi=function(){},Sc=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,rn(ht.current);var o=null;switch(n){case"input":l=Wl(e,l),r=Wl(e,r),o=[];break;case"select":l=E({},l,{value:void 0}),r=E({},r,{value:void 0}),o=[];break;case"textarea":l=Zl(e,l),r=Zl(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=tl)}Xl(n,r);var a;n=null;for(h in l)if(!r.hasOwnProperty(h)&&l.hasOwnProperty(h)&&l[h]!=null)if(h==="style"){var s=l[h];for(a in s)s.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(z.hasOwnProperty(h)?o||(o=[]):(o=o||[]).push(h,null));for(h in r){var d=r[h];if(s=l!=null?l[h]:void 0,r.hasOwnProperty(h)&&d!==s&&(d!=null||s!=null))if(h==="style")if(s){for(a in s)!s.hasOwnProperty(a)||d&&d.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in d)d.hasOwnProperty(a)&&s[a]!==d[a]&&(n||(n={}),n[a]=d[a])}else n||(o||(o=[]),o.push(h,n)),n=d;else h==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,s=s?s.__html:void 0,d!=null&&s!==d&&(o=o||[]).push(h,d)):h==="children"?typeof d!="string"&&typeof d!="number"||(o=o||[]).push(h,""+d):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(z.hasOwnProperty(h)?(d!=null&&h==="onScroll"&&oe("scroll",e),o||s===d||(o=[])):(o=o||[]).push(h,d))}n&&(o=o||[]).push("style",n);var h=o;(t.updateQueue=h)&&(t.flags|=4)}},Cc=function(e,t,n,r){n!==r&&(t.flags|=4)};function yr(e,t){if(!ce)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ze(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Vu(e,t,n){var r=t.pendingProps;switch(Do(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ze(t),null;case 1:return Me(t.type)&&rl(),ze(t),null;case 3:return r=t.stateNode,An(),ie(Re),ie(je),Jo(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(sl(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,at!==null&&(Ei(at),at=null))),vi(e,t),ze(t),null;case 5:Xo(t);var l=rn(mr.current);if(n=t.type,e!==null&&t.stateNode!=null)Sc(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(p(166));return ze(t),null}if(e=rn(ht.current),sl(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[gt]=t,r[cr]=o,e=(t.mode&1)!==0,n){case"dialog":oe("cancel",r),oe("close",r);break;case"iframe":case"object":case"embed":oe("load",r);break;case"video":case"audio":for(l=0;l<ir.length;l++)oe(ir[l],r);break;case"source":oe("error",r);break;case"img":case"image":case"link":oe("error",r),oe("load",r);break;case"details":oe("toggle",r);break;case"input":ra(r,o),oe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},oe("invalid",r);break;case"textarea":ia(r,o),oe("invalid",r)}Xl(n,o),l=null;for(var a in o)if(o.hasOwnProperty(a)){var s=o[a];a==="children"?typeof s=="string"?r.textContent!==s&&(o.suppressHydrationWarning!==!0&&el(r.textContent,s,e),l=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(o.suppressHydrationWarning!==!0&&el(r.textContent,s,e),l=["children",""+s]):z.hasOwnProperty(a)&&s!=null&&a==="onScroll"&&oe("scroll",r)}switch(n){case"input":Ar(r),oa(r,o,!0);break;case"textarea":Ar(r),sa(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=tl)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=ca(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[gt]=t,e[cr]=r,bc(e,t,!1,!1),t.stateNode=e;e:{switch(a=Yl(n,r),n){case"dialog":oe("cancel",e),oe("close",e),l=r;break;case"iframe":case"object":case"embed":oe("load",e),l=r;break;case"video":case"audio":for(l=0;l<ir.length;l++)oe(ir[l],e);l=r;break;case"source":oe("error",e),l=r;break;case"img":case"image":case"link":oe("error",e),oe("load",e),l=r;break;case"details":oe("toggle",e),l=r;break;case"input":ra(e,r),l=Wl(e,r),oe("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=E({},r,{value:void 0}),oe("invalid",e);break;case"textarea":ia(e,r),l=Zl(e,r),oe("invalid",e);break;default:l=r}Xl(n,l),s=l;for(o in s)if(s.hasOwnProperty(o)){var d=s[o];o==="style"?pa(e,d):o==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,d!=null&&da(e,d)):o==="children"?typeof d=="string"?(n!=="textarea"||d!=="")&&Hn(e,d):typeof d=="number"&&Hn(e,""+d):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(z.hasOwnProperty(o)?d!=null&&o==="onScroll"&&oe("scroll",e):d!=null&&Ve(e,o,d,a))}switch(n){case"input":Ar(e),oa(e,r,!1);break;case"textarea":Ar(e),sa(e);break;case"option":r.value!=null&&e.setAttribute("value",""+q(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?pn(e,!!r.multiple,o,!1):r.defaultValue!=null&&pn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=tl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ze(t),null;case 6:if(e&&t.stateNode!=null)Cc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(p(166));if(n=rn(mr.current),rn(ht.current),sl(t)){if(r=t.stateNode,n=t.memoizedProps,r[gt]=t,(o=r.nodeValue!==n)&&(e=We,e!==null))switch(e.tag){case 3:el(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&el(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[gt]=t,t.stateNode=r}return ze(t),null;case 13:if(ie(de),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ce&&$e!==null&&(t.mode&1)!==0&&(t.flags&128)===0)js(),Tn(),t.flags|=98560,o=!1;else if(o=sl(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(p(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(p(317));o[gt]=t}else Tn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ze(t),o=!1}else at!==null&&(Ei(at),at=null),o=!0;if(!o)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(de.current&1)!==0?ye===0&&(ye=3):Fi())),t.updateQueue!==null&&(t.flags|=4),ze(t),null);case 4:return An(),vi(e,t),e===null&&ar(t.stateNode.containerInfo),ze(t),null;case 10:return Wo(t.type._context),ze(t),null;case 17:return Me(t.type)&&rl(),ze(t),null;case 19:if(ie(de),o=t.memoizedState,o===null)return ze(t),null;if(r=(t.flags&128)!==0,a=o.rendering,a===null)if(r)yr(o,!1);else{if(ye!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(a=ml(e),a!==null){for(t.flags|=128,yr(o,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,a=o.alternate,a===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=a.childLanes,o.lanes=a.lanes,o.child=a.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=a.memoizedProps,o.memoizedState=a.memoizedState,o.updateQueue=a.updateQueue,o.type=a.type,e=a.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return te(de,de.current&1|2),t.child}e=e.sibling}o.tail!==null&&me()>Pn&&(t.flags|=128,r=!0,yr(o,!1),t.lanes=4194304)}else{if(!r)if(e=ml(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),yr(o,!0),o.tail===null&&o.tailMode==="hidden"&&!a.alternate&&!ce)return ze(t),null}else 2*me()-o.renderingStartTime>Pn&&n!==1073741824&&(t.flags|=128,r=!0,yr(o,!1),t.lanes=4194304);o.isBackwards?(a.sibling=t.child,t.child=a):(n=o.last,n!==null?n.sibling=a:t.child=a,o.last=a)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=me(),t.sibling=null,n=de.current,te(de,r?n&1|2:n&1),t):(ze(t),null);case 22:case 23:return Ai(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(Qe&1073741824)!==0&&(ze(t),t.subtreeFlags&6&&(t.flags|=8192)):ze(t),null;case 24:return null;case 25:return null}throw Error(p(156,t.tag))}function Ku(e,t){switch(Do(t),t.tag){case 1:return Me(t.type)&&rl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return An(),ie(Re),ie(je),Jo(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Xo(t),null;case 13:if(ie(de),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(p(340));Tn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ie(de),null;case 4:return An(),null;case 10:return Wo(t.type._context),null;case 22:case 23:return Ai(),null;case 24:return null;default:return null}}var Cl=!1,Ee=!1,Uu=typeof WeakSet=="function"?WeakSet:Set,j=null;function _n(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){fe(e,t,r)}else n.current=null}function yi(e,t,n){try{n()}catch(r){fe(e,t,r)}}var kc=!1;function Gu(e,t){if(Ao=Kr,e=ns(),Co(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var a=0,s=-1,d=-1,h=0,w=0,b=e,v=null;t:for(;;){for(var N;b!==n||l!==0&&b.nodeType!==3||(s=a+l),b!==o||r!==0&&b.nodeType!==3||(d=a+r),b.nodeType===3&&(a+=b.nodeValue.length),(N=b.firstChild)!==null;)v=b,b=N;for(;;){if(b===e)break t;if(v===n&&++h===l&&(s=a),v===o&&++w===r&&(d=a),(N=b.nextSibling)!==null)break;b=v,v=b.parentNode}b=N}n=s===-1||d===-1?null:{start:s,end:d}}else n=null}n=n||{start:0,end:0}}else n=null;for(Fo={focusedElem:e,selectionRange:n},Kr=!1,j=t;j!==null;)if(t=j,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,j=e;else for(;j!==null;){t=j;try{var I=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(I!==null){var A=I.memoizedProps,ge=I.memoizedState,m=t.stateNode,u=m.getSnapshotBeforeUpdate(t.elementType===t.type?A:st(t.type,A),ge);m.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(p(163))}}catch(S){fe(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,j=e;break}j=t.return}return I=kc,kc=!1,I}function wr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&yi(t,n,o)}l=l.next}while(l!==r)}}function kl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function wi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Nc(e){var t=e.alternate;t!==null&&(e.alternate=null,Nc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[gt],delete t[cr],delete t[Ro],delete t[Tu],delete t[zu])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function jc(e){return e.tag===5||e.tag===3||e.tag===4}function Tc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||jc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function bi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=tl));else if(r!==4&&(e=e.child,e!==null))for(bi(e,t,n),e=e.sibling;e!==null;)bi(e,t,n),e=e.sibling}function Si(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Si(e,t,n),e=e.sibling;e!==null;)Si(e,t,n),e=e.sibling}var Ce=null,ct=!1;function Kt(e,t,n){for(n=n.child;n!==null;)zc(e,t,n),n=n.sibling}function zc(e,t,n){if(mt&&typeof mt.onCommitFiberUnmount=="function")try{mt.onCommitFiberUnmount(Mr,n)}catch{}switch(n.tag){case 5:Ee||_n(n,t);case 6:var r=Ce,l=ct;Ce=null,Kt(e,t,n),Ce=r,ct=l,Ce!==null&&(ct?(e=Ce,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ce.removeChild(n.stateNode));break;case 18:Ce!==null&&(ct?(e=Ce,n=n.stateNode,e.nodeType===8?Po(e.parentNode,n):e.nodeType===1&&Po(e,n),Yn(e)):Po(Ce,n.stateNode));break;case 4:r=Ce,l=ct,Ce=n.stateNode.containerInfo,ct=!0,Kt(e,t,n),Ce=r,ct=l;break;case 0:case 11:case 14:case 15:if(!Ee&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,a=o.destroy;o=o.tag,a!==void 0&&((o&2)!==0||(o&4)!==0)&&yi(n,t,a),l=l.next}while(l!==r)}Kt(e,t,n);break;case 1:if(!Ee&&(_n(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){fe(n,t,s)}Kt(e,t,n);break;case 21:Kt(e,t,n);break;case 22:n.mode&1?(Ee=(r=Ee)||n.memoizedState!==null,Kt(e,t,n),Ee=r):Kt(e,t,n);break;default:Kt(e,t,n)}}function Ec(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Uu),t.forEach(function(r){var l=ep.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function dt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var o=e,a=t,s=a;e:for(;s!==null;){switch(s.tag){case 5:Ce=s.stateNode,ct=!1;break e;case 3:Ce=s.stateNode.containerInfo,ct=!0;break e;case 4:Ce=s.stateNode.containerInfo,ct=!0;break e}s=s.return}if(Ce===null)throw Error(p(160));zc(o,a,l),Ce=null,ct=!1;var d=l.alternate;d!==null&&(d.return=null),l.return=null}catch(h){fe(l,t,h)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Ic(t,e),t=t.sibling}function Ic(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(dt(t,e),vt(e),r&4){try{wr(3,e,e.return),kl(3,e)}catch(A){fe(e,e.return,A)}try{wr(5,e,e.return)}catch(A){fe(e,e.return,A)}}break;case 1:dt(t,e),vt(e),r&512&&n!==null&&_n(n,n.return);break;case 5:if(dt(t,e),vt(e),r&512&&n!==null&&_n(n,n.return),e.flags&32){var l=e.stateNode;try{Hn(l,"")}catch(A){fe(e,e.return,A)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,a=n!==null?n.memoizedProps:o,s=e.type,d=e.updateQueue;if(e.updateQueue=null,d!==null)try{s==="input"&&o.type==="radio"&&o.name!=null&&la(l,o),Yl(s,a);var h=Yl(s,o);for(a=0;a<d.length;a+=2){var w=d[a],b=d[a+1];w==="style"?pa(l,b):w==="dangerouslySetInnerHTML"?da(l,b):w==="children"?Hn(l,b):Ve(l,w,b,h)}switch(s){case"input":$l(l,o);break;case"textarea":aa(l,o);break;case"select":var v=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var N=o.value;N!=null?pn(l,!!o.multiple,N,!1):v!==!!o.multiple&&(o.defaultValue!=null?pn(l,!!o.multiple,o.defaultValue,!0):pn(l,!!o.multiple,o.multiple?[]:"",!1))}l[cr]=o}catch(A){fe(e,e.return,A)}}break;case 6:if(dt(t,e),vt(e),r&4){if(e.stateNode===null)throw Error(p(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(A){fe(e,e.return,A)}}break;case 3:if(dt(t,e),vt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Yn(t.containerInfo)}catch(A){fe(e,e.return,A)}break;case 4:dt(t,e),vt(e);break;case 13:dt(t,e),vt(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(Ni=me())),r&4&&Ec(e);break;case 22:if(w=n!==null&&n.memoizedState!==null,e.mode&1?(Ee=(h=Ee)||w,dt(t,e),Ee=h):dt(t,e),vt(e),r&8192){if(h=e.memoizedState!==null,(e.stateNode.isHidden=h)&&!w&&(e.mode&1)!==0)for(j=e,w=e.child;w!==null;){for(b=j=w;j!==null;){switch(v=j,N=v.child,v.tag){case 0:case 11:case 14:case 15:wr(4,v,v.return);break;case 1:_n(v,v.return);var I=v.stateNode;if(typeof I.componentWillUnmount=="function"){r=v,n=v.return;try{t=r,I.props=t.memoizedProps,I.state=t.memoizedState,I.componentWillUnmount()}catch(A){fe(r,n,A)}}break;case 5:_n(v,v.return);break;case 22:if(v.memoizedState!==null){_c(b);continue}}N!==null?(N.return=v,j=N):_c(b)}w=w.sibling}e:for(w=null,b=e;;){if(b.tag===5){if(w===null){w=b;try{l=b.stateNode,h?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(s=b.stateNode,d=b.memoizedProps.style,a=d!=null&&d.hasOwnProperty("display")?d.display:null,s.style.display=ua("display",a))}catch(A){fe(e,e.return,A)}}}else if(b.tag===6){if(w===null)try{b.stateNode.nodeValue=h?"":b.memoizedProps}catch(A){fe(e,e.return,A)}}else if((b.tag!==22&&b.tag!==23||b.memoizedState===null||b===e)&&b.child!==null){b.child.return=b,b=b.child;continue}if(b===e)break e;for(;b.sibling===null;){if(b.return===null||b.return===e)break e;w===b&&(w=null),b=b.return}w===b&&(w=null),b.sibling.return=b.return,b=b.sibling}}break;case 19:dt(t,e),vt(e),r&4&&Ec(e);break;case 21:break;default:dt(t,e),vt(e)}}function vt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(jc(n)){var r=n;break e}n=n.return}throw Error(p(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Hn(l,""),r.flags&=-33);var o=Tc(e);Si(e,o,l);break;case 3:case 4:var a=r.stateNode.containerInfo,s=Tc(e);bi(e,s,a);break;default:throw Error(p(161))}}catch(d){fe(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Wu(e,t,n){j=e,Ac(e)}function Ac(e,t,n){for(var r=(e.mode&1)!==0;j!==null;){var l=j,o=l.child;if(l.tag===22&&r){var a=l.memoizedState!==null||Cl;if(!a){var s=l.alternate,d=s!==null&&s.memoizedState!==null||Ee;s=Cl;var h=Ee;if(Cl=a,(Ee=d)&&!h)for(j=l;j!==null;)a=j,d=a.child,a.tag===22&&a.memoizedState!==null?Lc(l):d!==null?(d.return=a,j=d):Lc(l);for(;o!==null;)j=o,Ac(o),o=o.sibling;j=l,Cl=s,Ee=h}Fc(e)}else(l.subtreeFlags&8772)!==0&&o!==null?(o.return=l,j=o):Fc(e)}}function Fc(e){for(;j!==null;){var t=j;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Ee||kl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ee)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:st(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&_s(t,o,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}_s(t,a,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var d=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":d.autoFocus&&n.focus();break;case"img":d.src&&(n.src=d.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var h=t.alternate;if(h!==null){var w=h.memoizedState;if(w!==null){var b=w.dehydrated;b!==null&&Yn(b)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(p(163))}Ee||t.flags&512&&wi(t)}catch(v){fe(t,t.return,v)}}if(t===e){j=null;break}if(n=t.sibling,n!==null){n.return=t.return,j=n;break}j=t.return}}function _c(e){for(;j!==null;){var t=j;if(t===e){j=null;break}var n=t.sibling;if(n!==null){n.return=t.return,j=n;break}j=t.return}}function Lc(e){for(;j!==null;){var t=j;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{kl(4,t)}catch(d){fe(t,n,d)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(d){fe(t,l,d)}}var o=t.return;try{wi(t)}catch(d){fe(t,o,d)}break;case 5:var a=t.return;try{wi(t)}catch(d){fe(t,a,d)}}}catch(d){fe(t,t.return,d)}if(t===e){j=null;break}var s=t.sibling;if(s!==null){s.return=t.return,j=s;break}j=t.return}}var $u=Math.ceil,Nl=Ne.ReactCurrentDispatcher,Ci=Ne.ReactCurrentOwner,tt=Ne.ReactCurrentBatchConfig,G=0,be=null,he=null,ke=0,Qe=0,Ln=Ot(0),ye=0,br=null,on=0,jl=0,ki=0,Sr=null,Be=null,Ni=0,Pn=1/0,zt=null,Tl=!1,ji=null,Ut=null,zl=!1,Gt=null,El=0,Cr=0,Ti=null,Il=-1,Al=0;function _e(){return(G&6)!==0?me():Il!==-1?Il:Il=me()}function Wt(e){return(e.mode&1)===0?1:(G&2)!==0&&ke!==0?ke&-ke:Iu.transition!==null?(Al===0&&(Al=Ta()),Al):(e=X,e!==0||(e=window.event,e=e===void 0?16:Ra(e.type)),e)}function ut(e,t,n,r){if(50<Cr)throw Cr=0,Ti=null,Error(p(185));$n(e,n,r),((G&2)===0||e!==be)&&(e===be&&((G&2)===0&&(jl|=n),ye===4&&$t(e,ke)),De(e,r),n===1&&G===0&&(t.mode&1)===0&&(Pn=me()+500,ol&&Dt()))}function De(e,t){var n=e.callbackNode;Id(e,t);var r=Dr(e,e===be?ke:0);if(r===0)n!==null&&ka(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ka(n),t===1)e.tag===0?Eu(Rc.bind(null,e)):bs(Rc.bind(null,e)),Nu(function(){(G&6)===0&&Dt()}),n=null;else{switch(za(r)){case 1:n=oo;break;case 4:n=Na;break;case 16:n=Rr;break;case 536870912:n=ja;break;default:n=Rr}n=Uc(n,Pc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Pc(e,t){if(Il=-1,Al=0,(G&6)!==0)throw Error(p(327));var n=e.callbackNode;if(Rn()&&e.callbackNode!==n)return null;var r=Dr(e,e===be?ke:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=Fl(e,r);else{t=r;var l=G;G|=2;var o=Oc();(be!==e||ke!==t)&&(zt=null,Pn=me()+500,sn(e,t));do try{qu();break}catch(s){Mc(e,s)}while(!0);Go(),Nl.current=o,G=l,he!==null?t=0:(be=null,ke=0,t=ye)}if(t!==0){if(t===2&&(l=io(e),l!==0&&(r=l,t=zi(e,l))),t===1)throw n=br,sn(e,0),$t(e,r),De(e,me()),n;if(t===6)$t(e,r);else{if(l=e.current.alternate,(r&30)===0&&!Qu(l)&&(t=Fl(e,r),t===2&&(o=io(e),o!==0&&(r=o,t=zi(e,o))),t===1))throw n=br,sn(e,0),$t(e,r),De(e,me()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(p(345));case 2:cn(e,Be,zt);break;case 3:if($t(e,r),(r&130023424)===r&&(t=Ni+500-me(),10<t)){if(Dr(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){_e(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Lo(cn.bind(null,e,Be,zt),t);break}cn(e,Be,zt);break;case 4:if($t(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var a=31-ot(r);o=1<<a,a=t[a],a>l&&(l=a),r&=~o}if(r=l,r=me()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*$u(r/1960))-r,10<r){e.timeoutHandle=Lo(cn.bind(null,e,Be,zt),r);break}cn(e,Be,zt);break;case 5:cn(e,Be,zt);break;default:throw Error(p(329))}}}return De(e,me()),e.callbackNode===n?Pc.bind(null,e):null}function zi(e,t){var n=Sr;return e.current.memoizedState.isDehydrated&&(sn(e,t).flags|=256),e=Fl(e,t),e!==2&&(t=Be,Be=n,t!==null&&Ei(t)),e}function Ei(e){Be===null?Be=e:Be.push.apply(Be,e)}function Qu(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],o=l.getSnapshot;l=l.value;try{if(!it(o(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function $t(e,t){for(t&=~ki,t&=~jl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-ot(t),r=1<<n;e[n]=-1,t&=~r}}function Rc(e){if((G&6)!==0)throw Error(p(327));Rn();var t=Dr(e,0);if((t&1)===0)return De(e,me()),null;var n=Fl(e,t);if(e.tag!==0&&n===2){var r=io(e);r!==0&&(t=r,n=zi(e,r))}if(n===1)throw n=br,sn(e,0),$t(e,t),De(e,me()),n;if(n===6)throw Error(p(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,cn(e,Be,zt),De(e,me()),null}function Ii(e,t){var n=G;G|=1;try{return e(t)}finally{G=n,G===0&&(Pn=me()+500,ol&&Dt())}}function an(e){Gt!==null&&Gt.tag===0&&(G&6)===0&&Rn();var t=G;G|=1;var n=tt.transition,r=X;try{if(tt.transition=null,X=1,e)return e()}finally{X=r,tt.transition=n,G=t,(G&6)===0&&Dt()}}function Ai(){Qe=Ln.current,ie(Ln)}function sn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,ku(n)),he!==null)for(n=he.return;n!==null;){var r=n;switch(Do(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&rl();break;case 3:An(),ie(Re),ie(je),Jo();break;case 5:Xo(r);break;case 4:An();break;case 13:ie(de);break;case 19:ie(de);break;case 10:Wo(r.type._context);break;case 22:case 23:Ai()}n=n.return}if(be=e,he=e=Qt(e.current,null),ke=Qe=t,ye=0,br=null,ki=jl=on=0,Be=Sr=null,nn!==null){for(t=0;t<nn.length;t++)if(n=nn[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,o=n.pending;if(o!==null){var a=o.next;o.next=l,r.next=a}n.pending=r}nn=null}return e}function Mc(e,t){do{var n=he;try{if(Go(),gl.current=yl,hl){for(var r=ue.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}hl=!1}if(ln=0,we=ve=ue=null,gr=!1,hr=0,Ci.current=null,n===null||n.return===null){ye=1,br=t,he=null;break}e:{var o=e,a=n.return,s=n,d=t;if(t=ke,s.flags|=32768,d!==null&&typeof d=="object"&&typeof d.then=="function"){var h=d,w=s,b=w.tag;if((w.mode&1)===0&&(b===0||b===11||b===15)){var v=w.alternate;v?(w.updateQueue=v.updateQueue,w.memoizedState=v.memoizedState,w.lanes=v.lanes):(w.updateQueue=null,w.memoizedState=null)}var N=sc(a);if(N!==null){N.flags&=-257,cc(N,a,s,o,t),N.mode&1&&ac(o,h,t),t=N,d=h;var I=t.updateQueue;if(I===null){var A=new Set;A.add(d),t.updateQueue=A}else I.add(d);break e}else{if((t&1)===0){ac(o,h,t),Fi();break e}d=Error(p(426))}}else if(ce&&s.mode&1){var ge=sc(a);if(ge!==null){(ge.flags&65536)===0&&(ge.flags|=256),cc(ge,a,s,o,t),Ko(Fn(d,s));break e}}o=d=Fn(d,s),ye!==4&&(ye=2),Sr===null?Sr=[o]:Sr.push(o),o=a;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var m=oc(o,d,t);Fs(o,m);break e;case 1:s=d;var u=o.type,g=o.stateNode;if((o.flags&128)===0&&(typeof u.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Ut===null||!Ut.has(g)))){o.flags|=65536,t&=-t,o.lanes|=t;var S=ic(o,s,t);Fs(o,S);break e}}o=o.return}while(o!==null)}Dc(n)}catch(_){t=_,he===n&&n!==null&&(he=n=n.return);continue}break}while(!0)}function Oc(){var e=Nl.current;return Nl.current=yl,e===null?yl:e}function Fi(){(ye===0||ye===3||ye===2)&&(ye=4),be===null||(on&268435455)===0&&(jl&268435455)===0||$t(be,ke)}function Fl(e,t){var n=G;G|=2;var r=Oc();(be!==e||ke!==t)&&(zt=null,sn(e,t));do try{Zu();break}catch(l){Mc(e,l)}while(!0);if(Go(),G=n,Nl.current=r,he!==null)throw Error(p(261));return be=null,ke=0,ye}function Zu(){for(;he!==null;)Bc(he)}function qu(){for(;he!==null&&!bd();)Bc(he)}function Bc(e){var t=Kc(e.alternate,e,Qe);e.memoizedProps=e.pendingProps,t===null?Dc(e):he=t,Ci.current=null}function Dc(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Vu(n,t,Qe),n!==null){he=n;return}}else{if(n=Ku(n,t),n!==null){n.flags&=32767,he=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ye=6,he=null;return}}if(t=t.sibling,t!==null){he=t;return}he=t=e}while(t!==null);ye===0&&(ye=5)}function cn(e,t,n){var r=X,l=tt.transition;try{tt.transition=null,X=1,Xu(e,t,n,r)}finally{tt.transition=l,X=r}return null}function Xu(e,t,n,r){do Rn();while(Gt!==null);if((G&6)!==0)throw Error(p(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(p(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(Ad(e,o),e===be&&(he=be=null,ke=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||zl||(zl=!0,Uc(Rr,function(){return Rn(),null})),o=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||o){o=tt.transition,tt.transition=null;var a=X;X=1;var s=G;G|=4,Ci.current=null,Gu(e,n),Ic(n,e),xu(Fo),Kr=!!Ao,Fo=Ao=null,e.current=n,Wu(n),Sd(),G=s,X=a,tt.transition=o}else e.current=n;if(zl&&(zl=!1,Gt=e,El=l),o=e.pendingLanes,o===0&&(Ut=null),Nd(n.stateNode),De(e,me()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(Tl)throw Tl=!1,e=ji,ji=null,e;return(El&1)!==0&&e.tag!==0&&Rn(),o=e.pendingLanes,(o&1)!==0?e===Ti?Cr++:(Cr=0,Ti=e):Cr=0,Dt(),null}function Rn(){if(Gt!==null){var e=za(El),t=tt.transition,n=X;try{if(tt.transition=null,X=16>e?16:e,Gt===null)var r=!1;else{if(e=Gt,Gt=null,El=0,(G&6)!==0)throw Error(p(331));var l=G;for(G|=4,j=e.current;j!==null;){var o=j,a=o.child;if((j.flags&16)!==0){var s=o.deletions;if(s!==null){for(var d=0;d<s.length;d++){var h=s[d];for(j=h;j!==null;){var w=j;switch(w.tag){case 0:case 11:case 15:wr(8,w,o)}var b=w.child;if(b!==null)b.return=w,j=b;else for(;j!==null;){w=j;var v=w.sibling,N=w.return;if(Nc(w),w===h){j=null;break}if(v!==null){v.return=N,j=v;break}j=N}}}var I=o.alternate;if(I!==null){var A=I.child;if(A!==null){I.child=null;do{var ge=A.sibling;A.sibling=null,A=ge}while(A!==null)}}j=o}}if((o.subtreeFlags&2064)!==0&&a!==null)a.return=o,j=a;else e:for(;j!==null;){if(o=j,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:wr(9,o,o.return)}var m=o.sibling;if(m!==null){m.return=o.return,j=m;break e}j=o.return}}var u=e.current;for(j=u;j!==null;){a=j;var g=a.child;if((a.subtreeFlags&2064)!==0&&g!==null)g.return=a,j=g;else e:for(a=u;j!==null;){if(s=j,(s.flags&2048)!==0)try{switch(s.tag){case 0:case 11:case 15:kl(9,s)}}catch(_){fe(s,s.return,_)}if(s===a){j=null;break e}var S=s.sibling;if(S!==null){S.return=s.return,j=S;break e}j=s.return}}if(G=l,Dt(),mt&&typeof mt.onPostCommitFiberRoot=="function")try{mt.onPostCommitFiberRoot(Mr,e)}catch{}r=!0}return r}finally{X=n,tt.transition=t}}return!1}function Hc(e,t,n){t=Fn(n,t),t=oc(e,t,1),e=Vt(e,t,1),t=_e(),e!==null&&($n(e,1,t),De(e,t))}function fe(e,t,n){if(e.tag===3)Hc(e,e,n);else for(;t!==null;){if(t.tag===3){Hc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ut===null||!Ut.has(r))){e=Fn(n,e),e=ic(t,e,1),t=Vt(t,e,1),e=_e(),t!==null&&($n(t,1,e),De(t,e));break}}t=t.return}}function Yu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=_e(),e.pingedLanes|=e.suspendedLanes&n,be===e&&(ke&n)===n&&(ye===4||ye===3&&(ke&130023424)===ke&&500>me()-Ni?sn(e,0):ki|=n),De(e,t)}function Vc(e,t){t===0&&((e.mode&1)===0?t=1:(t=Br,Br<<=1,(Br&130023424)===0&&(Br=4194304)));var n=_e();e=Nt(e,t),e!==null&&($n(e,t,n),De(e,n))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Vc(e,n)}function ep(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(p(314))}r!==null&&r.delete(t),Vc(e,n)}var Kc;Kc=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Re.current)Oe=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return Oe=!1,Hu(e,t,n);Oe=(e.flags&131072)!==0}else Oe=!1,ce&&(t.flags&1048576)!==0&&Ss(t,al,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Sl(e,t),e=t.pendingProps;var l=kn(t,je.current);In(t,n),l=ni(null,t,r,e,l,n);var o=ri();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Me(r)?(o=!0,ll(t)):o=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Zo(t),l.updater=wl,t.stateNode=l,l._reactInternals=t,ci(t,r,e,n),t=fi(null,t,r,!0,o,n)):(t.tag=0,ce&&o&&Bo(t),Fe(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Sl(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=np(r),e=st(r,e),l){case 0:t=pi(null,t,r,e,n);break e;case 1:t=gc(null,t,r,e,n);break e;case 11:t=dc(null,t,r,e,n);break e;case 14:t=uc(null,t,r,st(r.type,e),n);break e}throw Error(p(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:st(r,l),pi(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:st(r,l),gc(e,t,r,l,n);case 3:e:{if(hc(t),e===null)throw Error(p(387));r=t.pendingProps,o=t.memoizedState,l=o.element,As(e,t),fl(t,r,null,n);var a=t.memoizedState;if(r=a.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){l=Fn(Error(p(423)),t),t=xc(e,t,r,n,l);break e}else if(r!==l){l=Fn(Error(p(424)),t),t=xc(e,t,r,n,l);break e}else for($e=Mt(t.stateNode.containerInfo.firstChild),We=t,ce=!0,at=null,n=Es(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Tn(),r===l){t=Tt(e,t,n);break e}Fe(e,t,r,n)}t=t.child}return t;case 5:return Ls(t),e===null&&Vo(t),r=t.type,l=t.pendingProps,o=e!==null?e.memoizedProps:null,a=l.children,_o(r,l)?a=null:o!==null&&_o(r,o)&&(t.flags|=32),mc(e,t),Fe(e,t,a,n),t.child;case 6:return e===null&&Vo(t),null;case 13:return vc(e,t,n);case 4:return qo(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=zn(t,null,r,n):Fe(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:st(r,l),dc(e,t,r,l,n);case 7:return Fe(e,t,t.pendingProps,n),t.child;case 8:return Fe(e,t,t.pendingProps.children,n),t.child;case 12:return Fe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,o=t.memoizedProps,a=l.value,te(dl,r._currentValue),r._currentValue=a,o!==null)if(it(o.value,a)){if(o.children===l.children&&!Re.current){t=Tt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var s=o.dependencies;if(s!==null){a=o.child;for(var d=s.firstContext;d!==null;){if(d.context===r){if(o.tag===1){d=jt(-1,n&-n),d.tag=2;var h=o.updateQueue;if(h!==null){h=h.shared;var w=h.pending;w===null?d.next=d:(d.next=w.next,w.next=d),h.pending=d}}o.lanes|=n,d=o.alternate,d!==null&&(d.lanes|=n),$o(o.return,n,t),s.lanes|=n;break}d=d.next}}else if(o.tag===10)a=o.type===t.type?null:o.child;else if(o.tag===18){if(a=o.return,a===null)throw Error(p(341));a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),$o(a,n,t),a=o.sibling}else a=o.child;if(a!==null)a.return=o;else for(a=o;a!==null;){if(a===t){a=null;break}if(o=a.sibling,o!==null){o.return=a.return,a=o;break}a=a.return}o=a}Fe(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,In(t,n),l=Je(l),r=r(l),t.flags|=1,Fe(e,t,r,n),t.child;case 14:return r=t.type,l=st(r,t.pendingProps),l=st(r.type,l),uc(e,t,r,l,n);case 15:return pc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:st(r,l),Sl(e,t),t.tag=1,Me(r)?(e=!0,ll(t)):e=!1,In(t,n),rc(t,r,l),ci(t,r,l,n),fi(null,t,r,!0,e,n);case 19:return wc(e,t,n);case 22:return fc(e,t,n)}throw Error(p(156,t.tag))};function Uc(e,t){return Ca(e,t)}function tp(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function nt(e,t,n,r){return new tp(e,t,n,r)}function _i(e){return e=e.prototype,!(!e||!e.isReactComponent)}function np(e){if(typeof e=="function")return _i(e)?1:0;if(e!=null){if(e=e.$$typeof,e===pt)return 11;if(e===ft)return 14}return 2}function Qt(e,t){var n=e.alternate;return n===null?(n=nt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function _l(e,t,n,r,l,o){var a=2;if(r=e,typeof e=="function")_i(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Le:return dn(n.children,l,o,t);case qe:a=8,l|=8;break;case It:return e=nt(12,n,t,l|2),e.elementType=It,e.lanes=o,e;case Ke:return e=nt(13,n,t,l),e.elementType=Ke,e.lanes=o,e;case lt:return e=nt(19,n,t,l),e.elementType=lt,e.lanes=o,e;case pe:return Ll(n,l,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case wt:a=10;break e;case qt:a=9;break e;case pt:a=11;break e;case ft:a=14;break e;case Pe:a=16,r=null;break e}throw Error(p(130,e==null?e:typeof e,""))}return t=nt(a,n,t,l),t.elementType=e,t.type=r,t.lanes=o,t}function dn(e,t,n,r){return e=nt(7,e,r,t),e.lanes=n,e}function Ll(e,t,n,r){return e=nt(22,e,r,t),e.elementType=pe,e.lanes=n,e.stateNode={isHidden:!1},e}function Li(e,t,n){return e=nt(6,e,null,t),e.lanes=n,e}function Pi(e,t,n){return t=nt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function rp(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ao(0),this.expirationTimes=ao(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ao(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Ri(e,t,n,r,l,o,a,s,d){return e=new rp(e,t,n,s,d),t===1?(t=1,o===!0&&(t|=8)):t=0,o=nt(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Zo(o),e}function lp(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ae,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Gc(e){if(!e)return Bt;e=e._reactInternals;e:{if(Xt(e)!==e||e.tag!==1)throw Error(p(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Me(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(p(171))}if(e.tag===1){var n=e.type;if(Me(n))return ys(e,n,t)}return t}function Wc(e,t,n,r,l,o,a,s,d){return e=Ri(n,r,!0,e,l,o,a,s,d),e.context=Gc(null),n=e.current,r=_e(),l=Wt(n),o=jt(r,l),o.callback=t??null,Vt(n,o,l),e.current.lanes=l,$n(e,l,r),De(e,r),e}function Pl(e,t,n,r){var l=t.current,o=_e(),a=Wt(l);return n=Gc(n),t.context===null?t.context=n:t.pendingContext=n,t=jt(o,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Vt(l,t,a),e!==null&&(ut(e,l,a,o),pl(e,l,a)),a}function Rl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function $c(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Mi(e,t){$c(e,t),(e=e.alternate)&&$c(e,t)}function op(){return null}var Qc=typeof reportError=="function"?reportError:function(e){console.error(e)};function Oi(e){this._internalRoot=e}Ml.prototype.render=Oi.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(p(409));Pl(e,t,null,null)},Ml.prototype.unmount=Oi.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;an(function(){Pl(null,e,null,null)}),t[bt]=null}};function Ml(e){this._internalRoot=e}Ml.prototype.unstable_scheduleHydration=function(e){if(e){var t=Aa();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Lt.length&&t!==0&&t<Lt[n].priority;n++);Lt.splice(n,0,e),n===0&&La(e)}};function Bi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ol(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Zc(){}function ip(e,t,n,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var h=Rl(a);o.call(h)}}var a=Wc(t,r,e,0,null,!1,!1,"",Zc);return e._reactRootContainer=a,e[bt]=a.current,ar(e.nodeType===8?e.parentNode:e),an(),a}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var s=r;r=function(){var h=Rl(d);s.call(h)}}var d=Ri(e,0,!1,null,null,!1,!1,"",Zc);return e._reactRootContainer=d,e[bt]=d.current,ar(e.nodeType===8?e.parentNode:e),an(function(){Pl(t,d,n,r)}),d}function Bl(e,t,n,r,l){var o=n._reactRootContainer;if(o){var a=o;if(typeof l=="function"){var s=l;l=function(){var d=Rl(a);s.call(d)}}Pl(t,a,e,l)}else a=ip(n,t,e,l,r);return Rl(a)}Ea=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Wn(t.pendingLanes);n!==0&&(so(t,n|1),De(t,me()),(G&6)===0&&(Pn=me()+500,Dt()))}break;case 13:an(function(){var r=Nt(e,1);if(r!==null){var l=_e();ut(r,e,1,l)}}),Mi(e,1)}},co=function(e){if(e.tag===13){var t=Nt(e,134217728);if(t!==null){var n=_e();ut(t,e,134217728,n)}Mi(e,134217728)}},Ia=function(e){if(e.tag===13){var t=Wt(e),n=Nt(e,t);if(n!==null){var r=_e();ut(n,e,t,r)}Mi(e,t)}},Aa=function(){return X},Fa=function(e,t){var n=X;try{return X=e,t()}finally{X=n}},to=function(e,t,n){switch(t){case"input":if($l(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=nl(r);if(!l)throw Error(p(90));na(r),$l(r,l)}}}break;case"textarea":aa(e,n);break;case"select":t=n.value,t!=null&&pn(e,!!n.multiple,t,!1)}},ha=Ii,xa=an;var ap={usingClientEntryPoint:!1,Events:[dr,Sn,nl,ma,ga,Ii]},kr={findFiberByHostInstance:Yt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},sp={bundleType:kr.bundleType,version:kr.version,rendererPackageName:kr.rendererPackageName,rendererConfig:kr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ne.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=ba(e),e===null?null:e.stateNode},findFiberByHostInstance:kr.findFiberByHostInstance||op,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Dl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Dl.isDisabled&&Dl.supportsFiber)try{Mr=Dl.inject(sp),mt=Dl}catch{}}return He.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ap,He.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Bi(t))throw Error(p(200));return lp(e,t,null,n)},He.createRoot=function(e,t){if(!Bi(e))throw Error(p(299));var n=!1,r="",l=Qc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=Ri(e,1,!1,null,null,n,!1,r,l),e[bt]=t.current,ar(e.nodeType===8?e.parentNode:e),new Oi(t)},He.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(p(188)):(e=Object.keys(e).join(","),Error(p(268,e)));return e=ba(t),e=e===null?null:e.stateNode,e},He.flushSync=function(e){return an(e)},He.hydrate=function(e,t,n){if(!Ol(t))throw Error(p(200));return Bl(null,e,t,!0,n)},He.hydrateRoot=function(e,t,n){if(!Bi(e))throw Error(p(405));var r=n!=null&&n.hydratedSources||null,l=!1,o="",a=Qc;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=Wc(t,null,e,1,n??null,l,!1,o,a),e[bt]=t.current,ar(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Ml(t)},He.render=function(e,t,n){if(!Ol(t))throw Error(p(200));return Bl(null,e,t,!1,n)},He.unmountComponentAtNode=function(e){if(!Ol(e))throw Error(p(40));return e._reactRootContainer?(an(function(){Bl(null,null,e,!1,function(){e._reactRootContainer=null,e[bt]=null})}),!0):!1},He.unstable_batchedUpdates=Ii,He.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Ol(n))throw Error(p(200));if(e==null||e._reactInternals===void 0)throw Error(p(38));return Bl(e,t,n,!1,r)},He.version="18.3.1-next-f1338f8080-20240426",He}var rd;function hp(){if(rd)return Vi.exports;rd=1;function c(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c)}catch(x){console.error(x)}}return c(),Vi.exports=gp(),Vi.exports}var ld;function xp(){if(ld)return Hl;ld=1;var c=hp();return Hl.createRoot=c.createRoot,Hl.hydrateRoot=c.hydrateRoot,Hl}var vp=xp(),ne=Zi();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yp=c=>c.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),wp=c=>c.replace(/^([A-Z])|[\s-_]+(\w)/g,(x,p,T)=>T?T.toUpperCase():p.toLowerCase()),od=c=>{const x=wp(c);return x.charAt(0).toUpperCase()+x.slice(1)},dd=(...c)=>c.filter((x,p,T)=>!!x&&x.trim()!==""&&T.indexOf(x)===p).join(" ").trim();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var bp={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sp=ne.forwardRef(({color:c="currentColor",size:x=24,strokeWidth:p=2,absoluteStrokeWidth:T,className:z="",children:C,iconNode:F,...H},K)=>ne.createElement("svg",{ref:K,...bp,width:x,height:x,stroke:c,strokeWidth:T?Number(p)*24/Number(x):p,className:dd("lucide",z),...H},[...F.map(([re,ae])=>ne.createElement(re,ae)),...Array.isArray(C)?C:[C]]));/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=(c,x)=>{const p=ne.forwardRef(({className:T,...z},C)=>ne.createElement(Sp,{ref:C,iconNode:x,className:dd(`lucide-${yp(od(c))}`,`lucide-${c}`,T),...z}));return p.displayName=od(c),p};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cp=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Vl=Z("arrow-right",Cp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kp=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],Np=Z("book-open",kp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jp=[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]],qi=Z("check-check",jp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tp=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Xi=Z("check",Tp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zp=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Ul=Z("chevron-down",zp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ep=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Gl=Z("chevron-right",Ep);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ip=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],Ap=Z("circle-alert",Ip);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fp=[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],_p=Z("code-xml",Fp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lp=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],Yi=Z("copy",Lp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pp=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]],jr=Z("crosshair",Pp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rp=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]],Mn=Z("download",Rp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mp=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],Op=Z("external-link",Mp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bp=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],un=Z("eye-off",Bp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dp=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Hp=Z("eye",Dp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vp=[["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",key:"1mlx9k"}]],ud=Z("file-code",Vp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kp=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",key:"1oajmo"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",key:"mpwhp6"}]],Up=Z("file-json",Kp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gp=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],id=Z("file-text",Gp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wp=[["path",{d:"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5",key:"1w6njk"}],["circle",{cx:"13",cy:"12",r:"2",key:"1j92g6"}],["path",{d:"M18 19c-2.8 0-5-2.2-5-5v8",key:"pkpw2h"}],["circle",{cx:"20",cy:"19",r:"2",key:"1obnsp"}]],pd=Z("folder-git-2",Wp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $p=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],Qp=Z("folder-open",$p);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zp=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],qp=Z("funnel",Zp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xp=[["line",{x1:"6",x2:"6",y1:"3",y2:"15",key:"17qcm7"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M18 9a9 9 0 0 1-9 9",key:"n2h4wq"}]],Yp=Z("git-branch",Xp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jp=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],ef=Z("info",Jp);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tf=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],Ji=Z("layers",tf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nf=[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]],rf=Z("maximize-2",nf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lf=[["polyline",{points:"4 14 10 14 10 20",key:"11kfnr"}],["polyline",{points:"20 10 14 10 14 4",key:"rlmsce"}],["line",{x1:"14",x2:"21",y1:"10",y2:"3",key:"o5lafz"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]],of=Z("minimize-2",lf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const af=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],sf=Z("package",af);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cf=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Bn=Z("plus",cf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const df=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],uf=Z("refresh-cw",df);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pf=[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]],ff=Z("terminal",pf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mf=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],ea=Z("triangle-alert",mf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gf=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],ta=Z("x",gf),On=[{figmaFrame:"CorpModuleDisplay-S-Nome",figmaW:768,figmaH:300,figmaFocus:{x:178,y:0,w:400,h:300},figmaOverlays:[{t:"badge",l:"Area Loghi",x:0,y:203,w:768,h:92}],configComponent:"Modules (Intro & Display)",configComponentKey:"module",configVariant:"Concept Photo",configVariantId:"Photo",configAssetLabel:"Mobile (XS)",configAssetId:"mobile",configW:768,configH:300,configFocus:null,status:"focus_add",changes:["Aggiungere f: {x:178, y:0, w:400, h:300}","Aggiungere oz: badge Area Loghi {x:0, y:203, w:768, h:92}"]},{figmaFrame:"CorpModuleDisplay-M-Nome",figmaW:991,figmaH:400,figmaFocus:{x:449,y:0,w:418,h:400},figmaOverlays:[{t:"text",l:"Area Testi",x:125,y:0,w:324,h:400},{t:"badge",l:"Area Loghi",x:498,y:299,w:320,h:86}],configComponent:"Modules (Intro & Display)",configComponentKey:"module",configVariant:"Concept Photo",configVariantId:"Photo",configAssetLabel:"Tablet (MD)",configAssetId:"tablet",configW:991,configH:400,configFocus:null,status:"focus_add",changes:["Aggiungere f: {x:449, y:0, w:418, h:400}","Aggiungere oz: text Area Testi {x:125, y:0, w:324, h:400}","Aggiungere oz: badge Area Loghi {x:498, y:299, w:320, h:86}"]},{figmaFrame:"CorpModuleDisplay-L-Nome",figmaW:2e3,figmaH:400,figmaFocus:{x:936,y:0,w:552,h:400},figmaOverlays:[{t:"text",l:"Area Testi",x:338,y:0,w:598,h:400},{t:"badge",l:"Area Loghi",x:1205,y:272,w:408,h:108}],configComponent:"Modules (Intro & Display)",configComponentKey:"module",configVariant:"Concept Photo",configVariantId:"Photo",configAssetLabel:"Desktop (LG+)",configAssetId:"desktop",configW:2e3,configH:400,configFocus:null,status:"focus_add",changes:["Aggiungere f: {x:936, y:0, w:552, h:400}","Aggiungere oz: text Area Testi {x:338, y:0, w:598, h:400}","Aggiungere oz: badge Area Loghi {x:1205, y:272, w:408, h:108}"]},{figmaFrame:"CorpIntroPhoto-S-Nome",figmaW:768,figmaH:300,figmaFocus:{x:178,y:0,w:400,h:300},figmaOverlays:[{t:"badge",l:"Area Loghi",x:0,y:203,w:768,h:92}],configComponent:"Modules (Intro & Display)",configComponentKey:"module",configVariant:"Concept Photo",configVariantId:"Photo",configAssetLabel:"Mobile (XS)",configAssetId:"mobile",configW:768,configH:300,configFocus:null,status:"ok",changes:["Mobile identico a Display-S (768×300)"]},{figmaFrame:"CorpModuleIntroPhoto-M-NomeFileALTO",figmaW:991,figmaH:470,figmaFocus:{x:446,y:0,w:418,h:470},figmaOverlays:[{t:"text",l:"Area Testi",x:122,y:0,w:324,h:470},{t:"badge",l:"Area Loghi",x:495,y:358,w:320,h:92}],configComponent:"Modules (Intro & Display)",configComponentKey:"module",configVariant:"Concept Photo",configVariantId:"Photo",configAssetLabel:"Tablet (MD)",configAssetId:"tablet",configW:991,configH:400,configFocus:null,status:"mismatch",changes:["h: 400 → 470 (variante ALTO, +70px)","Aggiungere f: {x:446, y:0, w:418, h:470}","Aggiungere oz: text Area Testi {x:122, y:0, w:324, h:470}","Aggiungere oz: badge Area Loghi {x:495, y:358, w:320, h:92}"]},{figmaFrame:"CorpModuleIntroPhoto-L-NomeFileALTO@2x",figmaW:2e3,figmaH:470,figmaFocus:{x:936,y:0,w:552,h:470},figmaOverlays:[{t:"text",l:"Area Testi",x:338,y:0,w:598,h:470},{t:"badge",l:"Area Loghi",x:1205,y:307,w:408,h:108}],configComponent:"Modules (Intro & Display)",configComponentKey:"module",configVariant:"Concept Photo",configVariantId:"Photo",configAssetLabel:"Desktop (LG+)",configAssetId:"desktop",configW:2e3,configH:400,configFocus:null,status:"mismatch",changes:["h: 400 → 470 (variante ALTO, +70px)","Aggiungere f: {x:936, y:0, w:552, h:470}","Aggiungere oz: text Area Testi {x:338, y:0, w:598, h:470}","Aggiungere oz: badge Area Loghi {x:1205, y:307, w:408, h:108}"]},{figmaFrame:"CorpModuleIntroBox-S-nome (Mobile)",figmaW:535,figmaH:309,figmaFocus:null,figmaOverlays:[],configComponent:"Modules (Intro & Display)",configComponentKey:"module",configVariant:"Concept Boxed",configVariantId:"Boxed",configAssetLabel:"Mobile (XS)",configAssetId:"mobile",configW:575,configH:309,configFocus:null,status:"mismatch",changes:["w: 575 → 535 (−40px)"]},{figmaFrame:"CorpModuleIntroBox-S-nome (Tablet)",figmaW:720,figmaH:309,figmaFocus:null,figmaOverlays:[],configComponent:"Modules (Intro & Display)",configComponentKey:"module",configVariant:"Concept Boxed",configVariantId:"Boxed",configAssetLabel:"Tablet (MD)",configAssetId:"tablet",configW:720,configH:309,configFocus:null,status:"ok",changes:[]},{figmaFrame:"CorpModuleIntroBox-L-nome",figmaW:912,figmaH:390,figmaFocus:{x:0,y:0,w:653,h:390},figmaOverlays:[],configComponent:"Modules (Intro & Display)",configComponentKey:"module",configVariant:"Concept Boxed",configVariantId:"Boxed",configAssetLabel:"Desktop (LG+)",configAssetId:"desktop",configW:912,configH:390,configFocus:null,status:"focus_add",changes:["Aggiungere f: {x:0, y:0, w:653, h:390}",'Aggiungere fl: "Sinistra"']},{figmaFrame:"CorpVisualMinimal-nome-",figmaW:1728,figmaH:400,figmaFocus:{x:630,y:79,w:469,h:242},figmaOverlays:[],configComponent:"Visual",configComponentKey:"visual",configVariant:"Mode Minimal (Full Width)",configVariantId:"minimal",configAssetLabel:"Desktop (XL)",configAssetId:"desktop",configW:2e3,configH:400,configFocus:null,status:"mismatch",changes:["w: 2000 → 1728 (−272px)","Aggiungere f: {x:630, y:79, w:469, h:242}",'Aggiungere fl: "Centro"']},{figmaFrame:"CorpVisualMulti-nome-",figmaW:864,figmaH:400,figmaFocus:{x:265,y:0,w:334,h:400},figmaOverlays:[],configComponent:"Visual",configComponentKey:"visual",configVariant:"Mode Multi (Grid)",configVariantId:"multi",configAssetLabel:"Colonna 1/2 (Tablet/Desktop)",configAssetId:"col-6",configW:700,configH:400,configFocus:null,status:"mismatch",changes:["w: 700 → 864 (+164px) — verificare se il frame rappresenta col-6 o altro breakpoint","Aggiungere f: {x:265, y:0, w:334, h:400}"]},{figmaFrame:"CorpCardSimpleReactive-Nome-",figmaW:636,figmaH:358,figmaFocus:null,figmaOverlays:[],configComponent:"Card Simple - Reactive",configComponentKey:"card_simple_reactive",configVariant:null,configVariantId:null,configAssetLabel:"Unica",configAssetId:"main",configW:636,configH:358,configFocus:null,status:"ok",changes:[]},{figmaFrame:"CorpCardPicture-nome-",figmaW:636,figmaH:315,figmaFocus:{x:130,y:0,w:376,h:315},figmaOverlays:[],configComponent:"Card Picture Corporate",configComponentKey:"card_picture_corp",configVariant:null,configVariantId:null,configAssetLabel:"Unica",configAssetId:"main",configW:636,configH:315,configFocus:null,status:"focus_add",changes:["Aggiungere f: {x:130, y:0, w:376, h:315}"]},{figmaFrame:"CorpCardPortrait2x3-Nome-",figmaW:400,figmaH:600,figmaFocus:{x:0,y:0,w:400,h:452},figmaOverlays:[],configComponent:"Card Portrait",configComponentKey:"card_portrait",configVariant:"Ratio 2:3",configVariantId:"ratio-2x3",configAssetLabel:"Unico",configAssetId:"main",configW:800,configH:1200,configFocus:null,status:"mismatch",changes:["w: 800 → 400 (dimezzato)","h: 1200 → 600 (dimezzato)","Aggiungere f: {x:0, y:0, w:400, h:452}",'Aggiungere fl: "Alto"']},{figmaFrame:"CorpCardPortrait4x5-Nome-",figmaW:400,figmaH:500,figmaFocus:{x:0,y:0,w:400,h:341},figmaOverlays:[],configComponent:"Card Portrait",configComponentKey:"card_portrait",configVariant:"Ratio 4:5",configVariantId:"ratio-4x5",configAssetLabel:"Unico",configAssetId:"main",configW:800,configH:1e3,configFocus:null,status:"mismatch",changes:["w: 800 → 400 (dimezzato)","h: 1000 → 500 (dimezzato)","Aggiungere f: {x:0, y:0, w:400, h:341}",'Aggiungere fl: "Alto"']},{figmaFrame:"CorpCardPortrait9x10-Nome-",figmaW:450,figmaH:500,figmaFocus:{x:0,y:0,w:450,h:324},figmaOverlays:[],configComponent:"Card Portrait",configComponentKey:"card_portrait",configVariant:null,configVariantId:null,configAssetLabel:null,configAssetId:null,configW:null,configH:null,configFocus:null,status:"new_variant",changes:["Nuova variante: Ratio 9:10","Asset: w:450, h:500","Focus f: {x:0, y:0, w:450, h:324}"]},{figmaFrame:"CorpContentEvidence-Nome-",figmaW:696,figmaH:358,figmaFocus:null,figmaOverlays:[],configComponent:null,configComponentKey:null,configVariant:null,configVariantId:null,configAssetLabel:null,configAssetId:null,configW:null,configH:null,configFocus:null,status:"new_component",changes:["Nuovo componente: Content Evidence","Asset unica: w:696, h:358"]},{figmaFrame:"CorpBoxRack-BadgeLoghi-nome",figmaW:604,figmaH:139,figmaFocus:null,figmaOverlays:[],configComponent:null,configComponentKey:null,configVariant:null,configVariantId:null,configAssetLabel:null,configAssetId:null,configW:null,configH:null,configFocus:null,status:"new_component",changes:["Nuovo componente: Box Rack Badge Loghi","Asset unica: w:604, h:139","Contiene 2 cerchi badge: 129×129px ciascuno"]}],hf={corporate:{label:"Corporate",styleDefaults:{light:{text:"#1A1C1E",btnBg:"#0047BB",btnLabel:"#FFFFFF"},dark:{text:"#FFFFFF",btnBg:"#FFFFFF",btnLabel:"#000000"}},components:{visual:{label:"Visual",filenamePrefix:"visual",variants:[{id:"minimal",label:"Mode Minimal (Full Width)",assets:[{id:"desktop",type:"img",label:"Desktop (XL)",w:1728,h:400,d:!1,fl:"Centro",f:{x:630,y:79,w:469,h:242},targetKB:150},{id:"tablet",type:"img",label:"Tablet (MD)",w:992,h:400,d:!1,targetKB:90},{id:"mobile",type:"img",label:"Mobile (XS)",w:768,h:400,d:!1,targetKB:70}]},{id:"multi",label:"Mode Multi (Grid)",assets:[{id:"col-6",type:"img",label:"Colonna 1/2 (Tablet/Desktop)",w:864,h:400,d:!0,fl:"Centro",f:{x:265,y:0,w:334,h:400},targetKB:85},{id:"col-4",type:"img",label:"Colonna 1/3 (Desktop XL)",w:460,h:400,d:!0,fl:"Centro",targetKB:65},{id:"mobile",type:"img",label:"Mobile Stacked (XS)",w:768,h:400,d:!1,fl:"Centro",targetKB:70}]}]},card_simple_reactive:{label:"Card Simple - Reactive",filenamePrefix:"cardSimpleReactive",assets:[{id:"main",type:"img",label:"Unica",w:636,h:358,d:!0,targetKB:70}]},card_picture_corp:{label:"Card Picture Corporate",filenamePrefix:"cardPicture",assets:[{id:"main",type:"img",label:"Unica",w:636,h:315,d:!0,fl:"Centro",f:{x:130,y:0,w:376,h:315},targetKB:60}]},card_portrait:{label:"Card Portrait",filenamePrefix:"cardPortrait",variants:[{id:"ratio-2x3",label:"Ratio 2:3",assets:[{id:"main",type:"img",label:"Unico",w:400,h:600,d:!1,fl:"Alto",f:{x:0,y:0,w:400,h:452},targetKB:95}]},{id:"ratio-4x5",label:"Ratio 4:5",assets:[{id:"main",type:"img",label:"Unico",w:400,h:500,d:!1,fl:"Alto",f:{x:0,y:0,w:400,h:341},targetKB:90}]},{id:"ratio-9x10",label:"Ratio 9:10",assets:[{id:"main",type:"img",label:"Unico",w:450,h:500,d:!1,fl:"Alto",f:{x:0,y:0,w:450,h:324},targetKB:90}]}]},masonry:{label:"Masonry Grid",filenamePrefix:"masonry",variants:[{id:"1-1",label:"Ratio 1:1",assets:[{id:"main",type:"img",label:"Unico",w:518,h:518,d:!0,targetKB:60}]},{id:"4-3",label:"Ratio 4:3",assets:[{id:"main",type:"img",label:"Unico",w:518,h:388,d:!0,targetKB:55}]},{id:"3-4",label:"Ratio 3:4",assets:[{id:"main",type:"img",label:"Unico",w:518,h:690,d:!0,targetKB:65}]},{id:"16-9",label:"Ratio 16:9",assets:[{id:"main",type:"img",label:"Unico",w:518,h:291,d:!0,targetKB:50}]}]},module:{label:"Modules (Intro & Display)",filenamePrefix:"module",variants:[{id:"Boxed",label:"Concept Boxed",assets:[{id:"desktop",type:"img",label:"Desktop (LG+)",w:912,h:390,d:!1,fl:"Sinistra",f:{x:0,y:0,w:653,h:390},targetKB:90},{id:"tablet",type:"img",label:"Tablet (MD)",w:720,h:309,d:!1,targetKB:70},{id:"mobile",type:"img",label:"Mobile (XS)",w:535,h:309,d:!1,targetKB:55}]},{id:"Photo",label:"Concept Photo (Display)",assets:[{id:"desktop",type:"img",label:"Desktop (LG+)",w:2e3,h:400,d:!1,fl:"Destra",f:{x:936,y:0,w:552,h:400},oz:[{t:"text",l:"Area Testi",x:338,y:0,w:598,h:400},{t:"badge",l:"Area Loghi",x:1205,y:272,w:408,h:108}],targetKB:150},{id:"tablet",type:"img",label:"Tablet (MD)",w:991,h:400,d:!1,fl:"Destra",f:{x:449,y:0,w:418,h:400},oz:[{t:"text",l:"Area Testi",x:125,y:0,w:324,h:400},{t:"badge",l:"Area Loghi",x:498,y:299,w:320,h:86}],targetKB:90},{id:"mobile",type:"img",label:"Mobile (XS)",w:768,h:300,d:!1,fl:"Centro",f:{x:178,y:0,w:400,h:300},oz:[{t:"badge",l:"Area Loghi",x:0,y:203,w:768,h:92}],targetKB:60}]},{id:"PhotoAlto",label:"Concept Photo Alto (Intro)",assets:[{id:"desktop",type:"img",label:"Desktop (LG+)",w:2e3,h:470,d:!1,fl:"Destra",f:{x:936,y:0,w:552,h:470},oz:[{t:"text",l:"Area Testi",x:338,y:0,w:598,h:470},{t:"badge",l:"Area Loghi",x:1205,y:307,w:408,h:108}],targetKB:150},{id:"tablet",type:"img",label:"Tablet (MD)",w:991,h:470,d:!1,fl:"Destra",f:{x:446,y:0,w:418,h:470},oz:[{t:"text",l:"Area Testi",x:122,y:0,w:324,h:470},{t:"badge",l:"Area Loghi",x:495,y:358,w:320,h:92}],targetKB:90},{id:"mobile",type:"img",label:"Mobile (XS)",w:768,h:300,d:!1,fl:"Centro",f:{x:178,y:0,w:400,h:300},oz:[{t:"badge",l:"Area Loghi",x:0,y:203,w:768,h:92}],targetKB:60}]}]},content_evidence:{label:"Content Evidence",filenamePrefix:"contentEvidence",assets:[{id:"main",type:"img",label:"Unica",w:696,h:358,d:!0,targetKB:70}]},box_rack_badge:{label:"Box Rack Badge Loghi",filenamePrefix:"boxRackBadge",assets:[{id:"main",type:"img",label:"Unica",w:604,h:139,d:!1,targetKB:30}]}}}},Et={totalWithOverlays:On.filter(c=>c.figmaOverlays.length>0).length,totalTextZones:On.reduce((c,x)=>c+x.figmaOverlays.filter(p=>p.t==="text").length,0),totalBadgeZones:On.reduce((c,x)=>c+x.figmaOverlays.filter(p=>p.t==="badge").length,0)},xf={ok:{label:"OK",color:"text-emerald-700",bg:"bg-emerald-50",border:"border-emerald-200",icon:i.jsx(Xi,{className:"w-3.5 h-3.5"})},mismatch:{label:"Mismatch",color:"text-red-700",bg:"bg-red-50",border:"border-red-200",icon:i.jsx(ta,{className:"w-3.5 h-3.5"})},new_component:{label:"Nuovo",color:"text-violet-700",bg:"bg-violet-50",border:"border-violet-200",icon:i.jsx(Bn,{className:"w-3.5 h-3.5"})},new_variant:{label:"Nuova Variante",color:"text-amber-700",bg:"bg-amber-50",border:"border-amber-200",icon:i.jsx(Bn,{className:"w-3.5 h-3.5"})},focus_add:{label:"Focus da aggiungere",color:"text-blue-700",bg:"bg-blue-50",border:"border-blue-200",icon:i.jsx(jr,{className:"w-3.5 h-3.5"})}};function vf({status:c}){const x=xf[c];return i.jsxs("span",{className:`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${x.bg} ${x.color} ${x.border} border`,style:{fontSize:"11px"},children:[x.icon,x.label]})}function ad({label:c,w:x,h:p,highlight:T}){return x===null||p===null?i.jsxs("div",{className:"text-center",children:[i.jsx("div",{className:"text-muted-foreground",style:{fontSize:"10px"},children:c}),i.jsx("div",{className:"text-muted-foreground",style:{fontSize:"12px"},children:"—"})]}):i.jsxs("div",{className:"text-center",children:[i.jsx("div",{className:"text-muted-foreground",style:{fontSize:"10px"},children:c}),i.jsxs("div",{className:T?"text-red-600":"",style:{fontSize:"13px",fontFamily:"monospace"},children:[x,"×",p]})]})}function sd({label:c,focus:x}){return i.jsxs("div",{className:"text-center",children:[i.jsx("div",{className:"text-muted-foreground",style:{fontSize:"10px"},children:c}),x?i.jsxs("div",{style:{fontSize:"11px",fontFamily:"monospace"},children:[x.x,",",x.y," ",x.w,"×",x.h]}):i.jsx("div",{className:"text-muted-foreground",style:{fontSize:"12px"},children:"—"})]})}function yf({zone:c}){const x=c.t==="text";return i.jsxs("div",{className:`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border ${x?"bg-yellow-50 border-yellow-300 text-yellow-800":"bg-pink-50 border-pink-300 text-pink-800"}`,style:{fontSize:"10px",fontFamily:"monospace"},children:[i.jsx(un,{className:"w-2.5 h-2.5 opacity-60"}),i.jsx("span",{className:"opacity-70",children:c.l}),i.jsxs("span",{children:[c.x,",",c.y," ",c.w,"×",c.h]})]})}function wf({entry:c}){const T=Math.min(140/c.figmaW,70/c.figmaH),z=Math.round(c.figmaW*T),C=Math.round(c.figmaH*T);return i.jsx("div",{className:"flex items-center justify-center flex-shrink-0",style:{width:140,height:70},children:i.jsxs("div",{className:"relative border border-slate-300 bg-slate-100 rounded-sm overflow-hidden",style:{width:z,height:C},children:[c.figmaOverlays.map((F,H)=>{const K=F.t==="text";return i.jsx("div",{className:`absolute ${K?"bg-amber-400/25 border border-dashed border-amber-500/60":"bg-red-400/25 border border-dashed border-red-500/60"}`,style:{left:`${F.x/c.figmaW*100}%`,top:`${F.y/c.figmaH*100}%`,width:`${F.w/c.figmaW*100}%`,height:`${F.h/c.figmaH*100}%`}},`oz-${H}`)}),c.figmaFocus&&i.jsx("div",{className:"absolute bg-green-400/25 border-2 border-green-500/70",style:{left:`${c.figmaFocus.x/c.figmaW*100}%`,top:`${c.figmaFocus.y/c.figmaH*100}%`,width:`${c.figmaFocus.w/c.figmaW*100}%`,height:`${c.figmaFocus.h/c.figmaH*100}%`}})]})})}function bf({entry:c}){return c.figmaFocus||c.figmaOverlays.length>0?i.jsxs("div",{className:"flex items-center gap-3 flex-wrap",style:{fontSize:"10px"},children:[c.figmaFocus&&i.jsxs("span",{className:"inline-flex items-center gap-1 text-green-700",children:[i.jsx("span",{className:"w-2 h-2 rounded-sm bg-green-500/30 border-2 border-green-500/70"}),"Area Focus (f)"]}),c.figmaOverlays.some(p=>p.t==="text")&&i.jsxs("span",{className:"inline-flex items-center gap-1 text-amber-700",children:[i.jsx("span",{className:"w-2 h-2 rounded-sm bg-amber-500/30 border border-dashed border-amber-500/70"}),"Area Testi (oz)"]}),c.figmaOverlays.some(p=>p.t==="badge")&&i.jsxs("span",{className:"inline-flex items-center gap-1 text-red-700",children:[i.jsx("span",{className:"w-2 h-2 rounded-sm bg-red-500/30 border border-dashed border-red-500/70",style:{borderWidth:"2px"}}),"Area Loghi (oz)"]})]}):null}function Sf({entry:c}){const x=c.configW!==null&&c.configH!==null&&(c.configW!==c.figmaW||c.configH!==c.figmaH);return i.jsxs("div",{className:`rounded-lg border p-4 ${c.status==="ok"?"border-slate-200 bg-white":c.status==="mismatch"?"border-red-200 bg-red-50/30":c.status==="new_component"||c.status==="new_variant"?"border-violet-200 bg-violet-50/20":"border-blue-200 bg-blue-50/20"}`,children:[i.jsxs("div",{className:"flex items-start justify-between gap-3 mb-3",children:[i.jsxs("div",{className:"min-w-0 flex-1",children:[i.jsxs("div",{className:"flex items-center gap-2 mb-1 flex-wrap",children:[i.jsx("span",{style:{fontSize:"13px",fontFamily:"monospace"},className:"text-slate-800 truncate",children:c.figmaFrame}),i.jsx(vf,{status:c.status}),c.figmaOverlays.length>0&&i.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700",style:{fontSize:"10px"},children:[i.jsx(un,{className:"w-3 h-3"}),c.figmaOverlays.length," oz"]})]}),c.configComponent&&i.jsxs("div",{className:"text-muted-foreground",style:{fontSize:"12px"},children:[c.configComponent,c.configVariant&&i.jsxs(i.Fragment,{children:[" → ",c.configVariant]}),c.configAssetLabel&&i.jsxs("span",{className:"text-slate-500",children:[" ","(",c.configAssetLabel,")"]})]})]}),i.jsx(wf,{entry:c})]}),i.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3 p-2.5 bg-slate-50 rounded-md",children:[i.jsx(ad,{label:"Figma",w:c.figmaW,h:c.figmaH}),i.jsx(ad,{label:"Config attuale",w:c.configW,h:c.configH,highlight:x}),i.jsx(sd,{label:"Focus Figma",focus:c.figmaFocus}),i.jsx(sd,{label:"Focus Config",focus:c.configFocus})]}),c.figmaOverlays.length>0&&i.jsxs("div",{className:"mb-3 p-2.5 bg-amber-50/50 border border-amber-100 rounded-md",children:[i.jsxs("div",{className:"text-amber-800 mb-1.5 flex items-center gap-1.5",style:{fontSize:"11px"},children:[i.jsx(un,{className:"w-3 h-3"}),"Overlay Zones (oz) rilevate"]}),i.jsx("div",{className:"flex flex-wrap gap-1.5",children:c.figmaOverlays.map((p,T)=>i.jsx(yf,{zone:p},T))})]}),i.jsx(bf,{entry:c}),c.changes.length>0&&i.jsx("div",{className:"space-y-1 mt-2",children:c.changes.map((p,T)=>i.jsxs("div",{className:"flex items-start gap-2 text-slate-700",style:{fontSize:"12px"},children:[i.jsx(ea,{className:`w-3 h-3 mt-0.5 flex-shrink-0 ${c.status==="mismatch"?"text-red-500":c.status==="new_component"||c.status==="new_variant"?"text-violet-500":"text-blue-500"}`}),i.jsx("span",{children:p})]},T))})]})}const Tr=`/**
 * ============================================================================
 * FILE: data.js
 * DESCRIZIONE: Configuration Layer
 *
 * Questo file funge da database statico per l'applicazione.
 * Contiene:
 * 1. STRINGS: Le etichette di testo per l'interfaccia (simil-i18n).
 * 2. SITE_CONFIG: Le specifiche tecniche per il ritaglio e l'export.
 *
 * NOTA ARCHITETTURALE:
 * I dati sono inclusi in un file .js invece che .json per permettere
 * l'esecuzione offline (aprendo index.html direttamente dal file system)
 * evitando errori di CORS (Cross-Origin Resource Sharing).
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/* 1. LOCALIZZAZIONE (STRINGS)                                                */
/* Dizionario chiave-valore per tutti i testi visibili nella UI.              */
/* -------------------------------------------------------------------------- */
const STRINGS = {
    appTitle: "Katana",
    versionTag: "v3.0 Stable",
    site: "Canale",
    processing: "Elaborazione...",
    zipping: "Creazione pacchetto",
    assetAnalysis: "Analisi asset",
    safariAlert: "Safari non è preciso. Dacci un taglio e usa Chrome.",
    newProject: "Nuovo Progetto",
    projectName: "Nome Progetto",
    exampleSlug: "es. promo-giappone",
    uiComponent: "Componente UI",
    variant: "Variante",
    noVariant: "Default",
    expectedAssets: "Asset previsti",
    uploadMaster: "Carica la prima immagine",
    dragOrClick: "Trascina qui o clicca per caricare (JPG, PNG, PSD...)",
    workspaceTitle: "Spazio di lavoro",
    reviewCuts: "Revisiona i tagli e scarica il pacchetto completo.",
    newButton: "Nuovo",
    downloadPackage: "Scarica pacchetto",
    editCrop: "Taglia",
    replace: "Sostituisci",
    add: "Aggiungi",
    modalHintGeneral: "Regola il taglio in modo da includere correttamente il soggetto.",
    modalHintFocus: "Ricorda: il soggetto deve rientrare nel riquadro di focus.",
    modalHintCircle: "Puoi mascherare l'immagine nel cerchio.",
    modalHintOz: "Le aree colorate indicano dove l'UI copre l'immagine. Evita di posizionare il soggetto sotto.",
    circleMaskToggle: "Taglia fuori dal cerchio",
    cancel: "Annulla",
    apply: "Applica",
    width: "Larghezza",
    height: "Altezza",
    zoom: "Zoom",
    fixButton: "Aumenta contrasto",
    themeLight: "on light",
    themeDark: "on dark",
    focusArea: "Area Focus",
    overlayZones: "Zone coperte",
    ozText: "Area Testi",
    ozBadge: "Area Loghi",
    dimensions: "Dimensioni @1x",
    targetWeight: "Peso target",
    focus: "Focus",
    labelImage: "Immagine",
    labelPalette: "Palette",
    svgTextPreview: "Anteprima testo",
    svgCtaPreview: "Button",
    iconImage: "image",
    iconPalette: "palette",
    psdToggleLabel: "Includi PSD con layer (sorgente + overlay)",
    psdLoading: "Caricamento libreria PSD...",
    psdReady: "PSD pronto",
    psdFail: "Libreria PSD non disponibile",
    psdGenerating: "Generazione PSD...",
    detectTitle: "Asset riconosciuto automaticamente",
    detectChannel: "Canale",
    detectComponent: "Componente",
    detectVariant: "Variante",
    detectSlug: "Progetto",
    detectConfirm: "Vuoi selezionare automaticamente questo componente?",
    detectBtnConfirm: "Seleziona",
    detectBtnCancel: "Ignora",
    detectFileName: "File"
};

/* -------------------------------------------------------------------------- */
/* 2. CONFIGURAZIONE SITI E ASSET (SITE_CONFIG)                               */
/* */
/* Struttura Gerarchica:                                                      */
/* Site -> Components -> Variants -> Assets                                   */
/* */
/* LEGENDA CHIAVI ASSET:                                                      */
/* - type:      "img" (raster) o "svg" (vettoriale/palette)                   */
/* - w, h:      Dimensioni base di output (@1x) in pixel                      */
/* - d:         Boolean. Se true, esporta anche versione retina (@2x)         */
/* - targetKB:  Peso massimo desiderato in KB (per compressione WebP)         */
/* - fl:        (Focus Label) Etichetta descrittiva punto di interesse        */
/* - f:         (Focus Area) Coordinate {x,y,w,h} per overlay guida in crop   */
/* - m:         "circle" attiva la maschera di ritaglio circolare             */
/* - controlH:  Oggetto {min, max, step} per asset ad altezza variabile       */
/* - oz:        (Overlay Zones) Array di zone di esclusione per il crop.      */
/*              Indica dove l'UI copre l'immagine (testo, loghi).             */
/*              Il soggetto NON dovrebbe trovarsi in queste zone.             */
/*              Formato: [{ t, l, x, y, w, h }]                              */
/*              t: "text" (Area Testi) | "badge" (Area Loghi)                 */
/*              l: label descrittiva (nomi da Figma)                          */
/*              x, y, w, h: coordinate in px @1x relative all'asset          */
/* -------------------------------------------------------------------------- */
const SITE_CONFIG = {
    posteit: {
        label: "Poste.it (Retail)",
        styleDefaults: {
            light: { text: "#1A1C1E", btnBg: "#0047BB", btnLabel: "#FFFFFF" },
            dark:  { text: "#FFFFFF", btnBg: "#FFFFFF", btnLabel: "#0047BB" }
        },
        components: {
            intro_concept_b: {
                label: "Intro Concept B",
                filenamePrefix: "conceptB",
                assets: [
                    { id: "soggettoLg", type: "img", label: "Desktop LG", w: 580, maxW: 940, h: 470, d: true, fl: "Alto Sx", f: { x: 0, y: 0, w: 404, h: 448 }, targetKB: 110 },
                    { id: "soggettoMd", type: "img", label: "Tablet MD", w: 580, h: 470, d: true, fl: "Alto Sx", f: { x: 0, y: 0, w: 394, h: 435 }, targetKB: 90 },
                    { id: "soggettoXs", type: "img", label: "Mobile XS", w: 767, h: 270, d: true, fl: "Alto Cx", f: { x: 204, y: 0, w: 345, h: 243 }, targetKB: 55 },
                    { id: "background", type: "svg", label: "Background", w: 4096, h: 470 }
                ]
            },
            intro_concept_a: {
                label: "Intro Concept A",
                filenamePrefix: "conceptA",
                variants: [
                    {
                        id: "base", label: "Base",
                        assets: [
                            { id: "main", type: "img", label: "Unico", w: 526, h: 526, d: true, m: "circle", fl: "Alto Sx", f: { x: 45, y: 87, w: 377, h: 303 }, targetKB: 70 }
                        ]
                    },
                    {
                        id: "promo", label: "Promo (SM + XS)",
                        assets: [
                            { id: "soggettoSm", type: "img", label: "Desktop SM", w: 526, h: 526, d: true, m: "circle", fl: "Alto Sx", f: { x: 45, y: 87, w: 377, h: 303 }, targetKB: 70 },
                            { id: "soggettoXs", type: "img", label: "Mobile XS", w: 767, h: 270, d: true, f: { x: 212, y: 0, w: 345, h: 243 }, targetKB: 50 }
                        ]
                    }
                ]
            },
            card_trendy: {
                label: "Card Trendy",
                filenamePrefix: "cardTrendy",
                variants: [
                    {
                        id: "color", label: "Sfondo colore",
                        assets: [
                            { id: "soggetto", type: "img", label: "Soggetto", w: 520, h: 360, d: true, targetKB: 55 },
                            { id: "background", type: "svg", label: "Background", w: 1138, h: 1138 }
                        ]
                    },
                    {
                        id: "pic", label: "Sfondo immagine",
                        assets: [
                            { id: "soggetto", type: "img", label: "Soggetto", w: 520, h: 360, d: true, targetKB: 55 },
                            { id: "background", type: "img", label: "Background", w: 1138, h: 1138, d: false, fl: "Basso Sx", f: { x: 0, y: 778, w: 334, h: 360 }, targetKB: 120 }
                        ]
                    }
                ]
            },
            card_picture: {
                label: "Card Picture",
                filenamePrefix: "cardPicture",
                assets: [
                    { id: "orizzontale", type: "img", label: "Orizzontale", w: 556, h: 275, d: true, fl: "Centro Alto", f: { x: 50, y: 0, w: 456, h: 212 }, targetKB: 40 },
                    { id: "estesa", type: "img", label: "Estesa", w: 743, h: 195, d: true, fl: "Centro Alto", f: { x: 204, y: 0, w: 274, h: 185 }, targetKB: 55 },
                    { id: "verticale", type: "img", label: "Verticale", w: 160, h: 280, d: true, fl: "Alto Sx", f: { x: 5, y: 0, w: 150, h: 186 }, targetKB: 30 }
                ]
            },
            card_reactive: {
                label: "Card Reactive",
                filenamePrefix: "cardReactive",
                assets: [
                    { id: "main", type: "img", label: "Unica", w: 743, h: 360, d: true, targetKB: 65 }
                ]
            },
            card_comparison: {
                label: "Card Comparison",
                filenamePrefix: "cardComparison",
                assets: [
                    { id: "main", type: "img", label: "Unica", w: 743, h: 195, d: true, fl: "Centro", f: { x: 235, y: 0, w: 274, h: 195 }, targetKB: 55 }
                ]
            },
            card_detailed_bg: {
                label: "Card Detailed BG",
                filenamePrefix: "cardDetailedBG",
                variants: [
                    {
                        id: "focus-top", label: "Focus Verticale (Alto)", initialFocus: "top",
                        assets: [
                            { id: "estesa", type: "img", label: "Estesa", w: 743, h: 285, d: true, fl: "Centro", f: { x: 204, y: 0, w: 334, h: 275 }, targetKB: 65 },
                            { id: "verticale", type: "img", label: "Verticale", w: 310, h: 500, d: true, fl: "Centro", controlH: { min: 500, max: 800, step: 50 }, f: { x: 9, y: 0, w: 291, h: 258 }, targetKB: 60 }
                        ]
                    },
                    {
                        id: "focus-center", label: "Focus Verticale (Centro)", initialFocus: "center",
                        assets: [
                            { id: "estesa", type: "img", label: "Estesa", w: 743, h: 285, d: true, fl: "Centro", f: { x: 204, y: 0, w: 334, h: 275 }, targetKB: 65 },
                            { id: "verticale", type: "img", label: "Verticale", w: 310, h: 500, d: true, fl: "Centro", controlH: { min: 500, max: 800, step: 50 }, f: { x: 9, y: 121, w: 291, h: 258 }, targetKB: 60 }
                        ]
                    },
                    {
                        id: "focus-bottom", label: "Focus Verticale (Basso)", initialFocus: "bottom",
                        assets: [
                            { id: "estesa", type: "img", label: "Estesa", w: 743, h: 285, d: true, fl: "Centro", f: { x: 204, y: 0, w: 334, h: 275 }, targetKB: 65 },
                            { id: "verticale", type: "img", label: "Verticale", w: 310, h: 500, d: true, fl: "Centro", controlH: { min: 500, max: 800, step: 50 }, f: { x: 9, y: 242, w: 291, h: 258 }, targetKB: 60 }
                        ]
                    }
                ]
            },
            pills_showcase: {
                label: "Pills Showcase",
                filenamePrefix: "pillsShowcase",
                variants: [
                    {
                        id: "focus-top", label: "Focus Verticale Alto", initialFocus: "top",
                        assets: [
                            { id: "estesa", type: "img", label: "Estesa", w: 743, h: 285, d: true, fl: "Alto Cx", f: { x: 204, y: 0, w: 334, h: 275 }, targetKB: 65 },
                            { id: "verticale", type: "img", label: "Verticale", w: 310, h: 650, d: true, fl: "Alto Cx", controlH: { min: 650, max: 1200, step: 50 }, f: { x: 16, y: 0, w: 278, h: 270 }, targetKB: 70 }
                        ]
                    },
                    {
                        id: "focus-center", label: "Focus Verticale Centro", initialFocus: "center",
                        assets: [
                            { id: "estesa", type: "img", label: "Estesa", w: 743, h: 285, d: true, fl: "Alto Cx", f: { x: 204, y: 0, w: 334, h: 275 }, targetKB: 65 },
                            { id: "verticale", type: "img", label: "Verticale", w: 310, h: 650, d: true, fl: "Alto Cx", controlH: { min: 650, max: 1200, step: 50 }, f: { x: 16, y: 190, w: 278, h: 270 }, targetKB: 70 }
                        ]
                    },
                    {
                        id: "focus-bottom", label: "Focus Verticale Basso", initialFocus: "bottom",
                        assets: [
                            { id: "estesa", type: "img", label: "Estesa", w: 743, h: 285, d: true, fl: "Alto Cx", f: { x: 204, y: 0, w: 334, h: 275 }, targetKB: 65 },
                            { id: "verticale", type: "img", label: "Verticale", w: 310, h: 650, d: true, fl: "Alto Cx", controlH: { min: 650, max: 1200, step: 50 }, f: { x: 16, y: 380, w: 278, h: 270 }, targetKB: 70 }
                        ]
                    }
                ]
            },
            banner_campaign_alfa: {
                label: "Banner Campaign Alfa",
                filenamePrefix: "bannerCampaignAlfa",
                assets: [
                    { id: "estesa", type: "img", label: "Estesa", w: 743, h: 360, d: true, targetKB: 70 },
                    { id: "orizzontale", type: "img", label: "Orizzontale", w: 520, h: 360, d: true, fl: "Centro", f: { x: 85, y: 0, w: 350, h: 360 }, targetKB: 50 }
                ]
            }
        }
    },
    corporate: {
        label: "Corporate",
        styleDefaults: {
            light: { text: "#1A1C1E", btnBg: "#0047BB", btnLabel: "#FFFFFF" },
            dark:  { text: "#FFFFFF", btnBg: "#FFFFFF", btnLabel: "#000000" }
        },
        components: {
            visual: {
                label: "Visual",
                filenamePrefix: "visual",
                variants: [
                    {
                        id: "minimal",
                        label: "Mode Minimal (Full Width)",
                        assets: [
                            { id: "desktop", type: "img", label: "Desktop (XL)", w: 1728, h: 400, d: false, fl: "Centro", f: { x: 630, y: 79, w: 469, h: 242 }, targetKB: 150 },
                            { id: "tablet",  type: "img", label: "Tablet (MD)",  w: 992,  h: 400, d: false, targetKB: 90 },
                            { id: "mobile",  type: "img", label: "Mobile (XS)",  w: 768,  h: 400, d: false, targetKB: 70 }
                        ]
                    },
                    {
                        id: "multi",
                        label: "Mode Multi (Grid)",
                        assets: [
                            { id: "col-6",  type: "img", label: "Colonna 1/2 (Tablet/Desktop)", w: 864, h: 400, d: true, fl: "Centro", f: { x: 265, y: 0, w: 334, h: 400 }, targetKB: 85 },
                            { id: "col-4",  type: "img", label: "Colonna 1/3 (Desktop XL)",     w: 460, h: 400, d: true, fl: "Centro", targetKB: 65 },
                            { id: "mobile", type: "img", label: "Mobile Stacked (XS)",          w: 768, h: 400, d: false, fl: "Centro", targetKB: 70 }
                        ]
                    }
                ]
            },
            card_simple_reactive: {
                label: "Card Simple - Reactive",
                filenamePrefix: "cardSimpleReactive",
                assets: [
                    { id: "main", type: "img", label: "Unica", w: 636, h: 358, d: true, targetKB: 70 }
                ]
            },
            card_picture_corp: {
                label: "Card Picture Corporate",
                filenamePrefix: "cardPicture",
                assets: [
                    { id: "main", type: "img", label: "Unica", w: 636, h: 315, d: true, fl: "Centro", f: { x: 130, y: 0, w: 376, h: 315 }, targetKB: 60 }
                ]
            },
            card_portrait: {
                label: "Card Portrait",
                filenamePrefix: "cardPortrait",
                variants: [
                    {
                        id: "ratio-2x3", label: "Ratio 2:3",
                        assets: [{ id: "main", type: "img", label: "Unico", w: 400, h: 600, d: false, fl: "Alto", f: { x: 0, y: 0, w: 400, h: 452 }, targetKB: 95 }]
                    },
                    {
                        id: "ratio-4x5", label: "Ratio 4:5",
                        assets: [{ id: "main", type: "img", label: "Unico", w: 400, h: 500, d: false, fl: "Alto", f: { x: 0, y: 0, w: 400, h: 341 }, targetKB: 90 }]
                    },
                    {
                        id: "ratio-9x10", label: "Ratio 9:10",
                        assets: [{ id: "main", type: "img", label: "Unico", w: 450, h: 500, d: false, fl: "Alto", f: { x: 0, y: 0, w: 450, h: 324 }, targetKB: 90 }]
                    }
                ]
            },
            masonry: {
                label: "Masonry Grid",
                filenamePrefix: "masonry",
                variants: [
                    { id: "1-1",  label: "Ratio 1:1",  assets: [{ id: "main", type: "img", label: "Unico", w: 518, h: 518, d: true, targetKB: 60 }] },
                    { id: "4-3",  label: "Ratio 4:3",  assets: [{ id: "main", type: "img", label: "Unico", w: 518, h: 388, d: true, targetKB: 55 }] },
                    { id: "3-4",  label: "Ratio 3:4",  assets: [{ id: "main", type: "img", label: "Unico", w: 518, h: 690, d: true, targetKB: 65 }] },
                    { id: "16-9", label: "Ratio 16:9", assets: [{ id: "main", type: "img", label: "Unico", w: 518, h: 291, d: true, targetKB: 50 }] }
                ]
            },
            module: {
                label: "Modules (Intro & Display)",
                filenamePrefix: "module",
                variants: [
                    {
                        id: "Boxed", label: "Concept Boxed",
                        assets: [
                            { id: "desktop", type: "img", label: "Desktop (LG+)", w: 912, h: 390, d: true, fl: "Sinistra", f: { x: 0, y: 0, w: 653, h: 390 }, targetKB: 90 },
                            { id: "tablet",  type: "img", label: "Tablet (MD)",   w: 720, h: 309, d: true, targetKB: 70 },
                            { id: "mobile",  type: "img", label: "Mobile (XS)",   w: 535, h: 309, d: true, targetKB: 55 }
                        ]
                    },
                    {
                        id: "Photo", label: "Concept Photo (Display)",
                        assets: [
                            {
                                id: "desktop", type: "img", label: "Desktop (LG+)", w: 2000, h: 400, d: true,
                                fl: "Destra", f: { x: 936, y: 0, w: 552, h: 400 },
                                oz: [
                                    { t: "text",  l: "Area Testi",  x: 338,  y: 0,   w: 598, h: 400 },
                                    { t: "badge", l: "Area Loghi",  x: 1205, y: 272, w: 408, h: 108 }
                                ],
                                targetKB: 150
                            },
                            {
                                id: "tablet", type: "img", label: "Tablet (MD)", w: 991, h: 400, d: true,
                                fl: "Destra", f: { x: 449, y: 0, w: 418, h: 400 },
                                oz: [
                                    { t: "text",  l: "Area Testi",  x: 125, y: 0,   w: 324, h: 400 },
                                    { t: "badge", l: "Area Loghi",  x: 498, y: 299, w: 320, h: 86 }
                                ],
                                targetKB: 90
                            },
                            {
                                id: "mobile", type: "img", label: "Mobile (XS)", w: 768, h: 300, d: true,
                                fl: "Centro", f: { x: 178, y: 0, w: 400, h: 300 },
                                oz: [
                                    { t: "badge", l: "Area Loghi", x: 0, y: 203, w: 768, h: 92 }
                                ],
                                targetKB: 60
                            }
                        ]
                    },
                    {
                        id: "PhotoAlto", label: "Concept Photo Alto (Intro)",
                        assets: [
                            {
                                id: "desktop", type: "img", label: "Desktop (LG+)", w: 2000, h: 470, d: true,
                                fl: "Destra", f: { x: 936, y: 0, w: 552, h: 470 },
                                oz: [
                                    { t: "text",  l: "Area Testi",  x: 338,  y: 0,   w: 598, h: 470 },
                                    { t: "badge", l: "Area Loghi",  x: 1205, y: 307, w: 408, h: 108 }
                                ],
                                targetKB: 150
                            },
                            {
                                id: "tablet", type: "img", label: "Tablet (MD)", w: 991, h: 470, d: true,
                                fl: "Destra", f: { x: 446, y: 0, w: 418, h: 470 },
                                oz: [
                                    { t: "text",  l: "Area Testi",  x: 122, y: 0,   w: 324, h: 470 },
                                    { t: "badge", l: "Area Loghi",  x: 495, y: 358, w: 320, h: 92 }
                                ],
                                targetKB: 90
                            },
                            {
                                id: "mobile", type: "img", label: "Mobile (XS)", w: 768, h: 300, d: true,
                                fl: "Centro", f: { x: 178, y: 0, w: 400, h: 300 },
                                oz: [
                                    { t: "badge", l: "Area Loghi", x: 0, y: 203, w: 768, h: 92 }
                                ],
                                targetKB: 60
                            }
                        ]
                    }
                ]
            },
            content_evidence: {
                label: "Content Evidence",
                filenamePrefix: "contentEvidence",
                assets: [
                    { id: "main", type: "img", label: "Unica", w: 696, h: 358, d: true, targetKB: 70 }
                ]
            },
            box_rack_badge: {
                label: "Box Rack Badge Loghi",
                filenamePrefix: "boxRackBadge",
                assets: [
                    { id: "main", type: "img", label: "Unica", w: 604, h: 139, d: false, targetKB: 30 }
                ]
            }
        }
    },
    social: {
        label: "Social Media Kit",
        styleDefaults: {
            light: { text: "#000000", btnBg: "#1D9BF0", btnLabel: "#FFFFFF" },
            dark:  { text: "#FFFFFF", btnBg: "#FFFFFF", btnLabel: "#000000" }
        },
        components: {
            instagram: {
                label: "Instagram",
                filenamePrefix: "ig",
                variants: [
                    {
                        id: "feed", label: "Feed Posts",
                        assets: [
                            { id: "portrait", type: "img", label: "Portrait (4:5) - Best Visibility", w: 1080, h: 1350, d: false, fl: "Centro", targetKB: 250 },
                            { id: "square", type: "img", label: "Square (1:1)", w: 1080, h: 1080, d: false, fl: "Centro", targetKB: 200 }
                        ]
                    },
                    {
                        id: "stories", label: "Stories & Reels Cover",
                        assets: [
                            { id: "story", type: "img", label: "Story (9:16)", w: 1080, h: 1920, d: false, fl: "Centro", targetKB: 300 }
                        ]
                    }
                ]
            },
            linkedin: {
                label: "LinkedIn",
                filenamePrefix: "li",
                assets: [
                    { id: "post-landscape", type: "img", label: "Post Landscape / Link (1.91:1)", w: 1200, h: 627, d: false, fl: "Centro", targetKB: 200 },
                    { id: "post-square", type: "img", label: "Post Square (1:1)", w: 1200, h: 1200, d: false, fl: "Centro", targetKB: 250 }
                ]
            },
            facebook: {
                label: "Facebook",
                filenamePrefix: "fb",
                assets: [
                    { id: "post-landscape", type: "img", label: "Post Landscape (1.91:1)", w: 1200, h: 630, d: false, fl: "Centro", targetKB: 200 },
                    { id: "story", type: "img", label: "Story (9:16)", w: 1080, h: 1920, d: false, fl: "Centro", targetKB: 300 }
                ]
            },
            youtube: {
                label: "YouTube",
                filenamePrefix: "yt",
                assets: [
                    { id: "thumbnail", type: "img", label: "Thumbnail Video (16:9)", w: 1280, h: 720, d: false, fl: "Centro", targetKB: 200 }
                ]
            },
            x_twitter: {
                label: "X (Twitter)",
                filenamePrefix: "x",
                assets: [
                    { id: "post", type: "img", label: "In-Stream Post (16:9)", w: 1600, h: 900, d: false, fl: "Centro", targetKB: 250 }
                ]
            }
        }
    }
};
`,zr=`/* KATANA v3.0 Stable (No-Pica / Offline Version) */

const APP_VER = "v3.0 Local";
let STATE = { site: "posteit", comp: "", variant: "main", img: null, slug: "export", items: [], colors: { raw: [] }, exportPsd: false };

let cropper = null,
    editIdx = -1,
    repIdx = -1;
let dom = {};

// Helper per mostrare il loader
function showLoader(show, text) {
    const loader = document.getElementById("loadingOverlay");
    const txt = document.getElementById("loaderText");
    if (loader) loader.style.display = show ? "flex" : "none";
    if (text && txt) txt.innerText = text;
}

// Risoluzione stili e colori
function resolveStyles(siteConfig, assetSpec, theme) {
    const safeSiteConfig = siteConfig || {};
    const safeAssetSpec = assetSpec || {};
    const defaults = safeSiteConfig.styleDefaults?.[theme] || {};
    const overrides = safeAssetSpec.style?.[theme] || {};
    const btnType = safeAssetSpec.style?.btnType || "filled";
    const getVal = (key) =>
        overrides && overrides[key] ? overrides[key] : defaults && defaults[key] ? defaults[key] : "#FF00FF";
    return { btnType: btnType, text: getVal("text"), btnBg: getVal("btnBg"), btnLabel: getVal("btnLabel") };
}

// Controllo contrasto colori
function checkContrast(bgColors, styles) {
    let minRatio = 21,
        issues = [];
    bgColors.forEach((bg) => {
        // Se tinycolor non è caricato, fallback dummy
        if (typeof tinycolor === "undefined") return { ok: true, val: 21 };

        const ratioText = tinycolor.readability(bg, styles.text);
        if (ratioText < 4.5) issues.push("text");
        if (ratioText < minRatio) minRatio = ratioText;
        if (styles.btnType === "text") {
            const ratioBtnLabel = tinycolor.readability(bg, styles.btnLabel);
            if (ratioBtnLabel < 4.5) issues.push("btnLabel");
            if (ratioBtnLabel < minRatio) minRatio = ratioBtnLabel;
        } else {
            if (tinycolor.readability(bg, styles.btnBg) < 3.0) issues.push("btnBox");
        }
    });
    return { ok: issues.length === 0, val: minRatio.toFixed(2) };
}

function enforceContrast(bgColors, styles) {
    if (typeof tinycolor === "undefined") return bgColors;
    const isTextLight = tinycolor(styles.text).isLight();
    return bgColors.map((bg) => {
        let c = tinycolor(bg),
            safety = 0;
        while (safety < 100) {
            let satisfied = true;
            const currentHex = c.toHexString();
            if (tinycolor.readability(currentHex, styles.text) < 4.5) satisfied = false;
            if (styles.btnType === "filled") {
                if (tinycolor.readability(currentHex, styles.btnBg) < 3.0) satisfied = false;
            } else {
                if (tinycolor.readability(currentHex, styles.btnLabel) < 4.5) satisfied = false;
            }
            if (satisfied) break;
            isTextLight ? c.darken(1) : c.lighten(1);
            safety++;
        }
        return c.toHexString();
    });
}

function extractColors(img) {
    const c = document.createElement("canvas");
    c.width = 1;
    c.height = 20;
    const x = c.getContext("2d");
    x.drawImage(img, 0, 0, 1, 20);
    const d = x.getImageData(0, 0, 1, 20).data;
    // Fallback sicuro se tinycolor manca
    const toHex = (r, g, b) => (typeof tinycolor !== "undefined" ? tinycolor({ r, g, b }).toHexString() : "#ffffff");

    return [toHex(d[0], d[1], d[2]), toHex(d[16], d[17], d[18]), toHex(d[36], d[37], d[38])];
}

function getFilename(item) {
    if (!SITE_CONFIG[STATE.site] || !SITE_CONFIG[STATE.site].components[STATE.comp]) return "error-" + STATE.slug;
    const componentConfig = SITE_CONFIG[STATE.site].components[STATE.comp];
    let baseCompName = componentConfig.filenamePrefix || STATE.comp;
    if (componentConfig.variants && STATE.variant && STATE.variant !== "main")
        baseCompName += STATE.variant.replace(/-/g, "");

    let assetId = item.type === "svg" ? "background" : item.assetSpec.id;
    let assetPart = assetId !== "main" ? "-" + assetId : "";
    let ext = item.type === "svg" ? ".svg" : item.assetSpec.d ? "@2x.webp" : ".webp";

    // Gestione suffisso slug vuoto
    let slugSuffix = STATE.slug ? "-" + STATE.slug : "";

    if (item.assetSpec.controlH) {
        ext = item.assetSpec.d ? "x" + item.currentH + "@2x.webp" : "x" + item.currentH + ".webp";
    }
    return (baseCompName + assetPart + slugSuffix + ext).replace(/--/g, "-");
}

function applyStrings() {
    if (typeof STRINGS === "undefined") return;
    document.title = STRINGS.appTitle;
    const vTag = document.getElementById("versionTag");
    if (vTag) vTag.innerText = STRINGS.versionTag;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (STRINGS[key]) el.textContent = STRINGS[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (STRINGS[key]) el.placeholder = STRINGS[key];
    });
}

function populateSiteSelector() {
    dom.site.innerHTML = "";
    if (typeof SITE_CONFIG === "undefined") return;
    var keys = Object.keys(SITE_CONFIG);
    if (!keys.length) return (dom.site.innerHTML = "<option disabled>No Config</option>");
    keys.forEach(function(key) {
        var option = document.createElement("option");
        option.value = key;
        option.text = SITE_CONFIG[key].label;
        dom.site.appendChild(option);
    });
    var saved = localStorage.getItem("katana_site");
    STATE.site = saved && keys.includes(saved) ? saved : (keys.includes("posteit") ? "posteit" : keys[0]);
    dom.site.value = STATE.site;
}

function updateCompList() {
    if (!SITE_CONFIG[STATE.site]) return;
    const components = SITE_CONFIG[STATE.site].components;
    dom.comp.innerHTML = "";
    Object.keys(components).forEach((k) => {
        const o = document.createElement("option");
        o.value = k;
        o.text = components[k].label;
        dom.comp.add(o);
    });
    STATE.comp = dom.comp.value;
    dom.variant && dom.variantContainer ? updateVariantList() : ((STATE.variant = "main"), updateSpecs());
}

function updateVariantList() {
    if (!dom.variant) return;
    const component = SITE_CONFIG[STATE.site].components[STATE.comp];
    const variants = component.variants;
    dom.variant.innerHTML = "";
    dom.variantContainer.style.opacity = variants && variants.length ? "1" : "0.5";
    dom.variant.disabled = !(variants && variants.length);
    STATE.variant = "main";
    if (variants && variants.length > 0) {
        variants.forEach((v) => {
            const o = document.createElement("option");
            o.value = v.id;
            o.text = v.label;
            dom.variant.add(o);
        });
        STATE.variant = dom.variant.value;
    } else {
        dom.variant.innerHTML = '<option value="main" selected disabled>' + STRINGS.noVariant + '</option>';
    }
    updateSpecs();
}

function getActiveAssets() {
    const component = SITE_CONFIG[STATE.site].components[STATE.comp];
    if (component.variants) {
        const activeVariant = component.variants.find((v) => v.id === STATE.variant);
        return activeVariant ? activeVariant.assets : [];
    }
    return component.assets || [];
}

function updateSpecs() {
    const assets = getActiveAssets();
    dom.specs.innerHTML = assets
        .map(
            (a) => '<span class="spec-chip" title="' + STRINGS.targetWeight + ': ' + a.targetKB + 'KB">'
                + '<span class="icon">' + (a.type === "svg" ? STRINGS.iconPalette : STRINGS.iconImage) + '</span> '
                + a.label + '</span>'
        )
        .join("");
}

// --- INIT ---
document.addEventListener("DOMContentLoaded", async () => {
    showLoader(true);
    applyStrings();

    dom = {
        site: document.getElementById("siteSelector"),
        comp: document.getElementById("componentType"),
        variant: document.getElementById("variantSelector"),
        variantContainer: document.getElementById("variantSelectContainer"),
        specs: document.getElementById("specsContainer"),
        drop: document.getElementById("dropZone"),
        file: document.getElementById("fileInput"),
        rep: document.getElementById("replaceInput"),
        slug: document.getElementById("fileDesc"),
        grid: document.getElementById("previewGrid"),
        step1: document.getElementById("step1"),
        step2: document.getElementById("step2"),
        btn: document.getElementById("processBtn"),
        modal: document.getElementById("editorModal"),
        modalImg: document.getElementById("editorImage"),
        range: document.getElementById("modalRangeGroup"),
        slider: document.getElementById("modalWidthSlider"),
        val: document.getElementById("modalWidthVal"),
        rangeLabel: document.getElementById("modalRangeLabel"),
        loader: document.getElementById("loadingOverlay"),
        loaderText: document.getElementById("loaderText"),
        safari: document.getElementById("safariAlert"),
        modalCircleGroup: document.getElementById("modalCircleGroup"),
        circleMaskToggle: document.getElementById("circleMaskToggle"),
        zoomSlider: document.getElementById("modalZoomSlider"),
        zoomGroup: document.getElementById("modalZoomGroup"),
        psdToggle: document.getElementById("psdToggle"),
        psdStatus: document.getElementById("psdStatus")
    };

    populateSiteSelector();
    updateCompList();

    dom.site.onchange = () => {
        STATE.site = dom.site.value;
        localStorage.setItem("katana_site", STATE.site);
        updateCompList();
        window.resetApp();
    };
    dom.comp.onchange = () => {
        STATE.comp = dom.comp.value;
        dom.variant ? updateVariantList() : updateSpecs();
        window.resetApp();
    };
    dom.variant.onchange = () => {
        STATE.variant = dom.variant.value;
        updateSpecs();
        window.resetApp();
    };

    dom.slug.oninput = () => {
        STATE.slug = dom.slug.value
            .trim()
            .replace(/[^a-z0-9-]/gi, "")
            .toLowerCase()
            .replace(/-/g, "_");
    };

    dom.drop.onclick = () => dom.file.click();
    dom.drop.ondragover = (e) => {
        e.preventDefault();
        dom.drop.classList.add("border-primary", "bg-light");
    };
    dom.drop.ondragleave = () => dom.drop.classList.remove("border-primary", "bg-light");
    dom.drop.ondrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0]) loadMaster(e.dataTransfer.files[0]);
    };
    dom.file.onchange = () => {
        if (dom.file.files[0]) loadMaster(dom.file.files[0]);
    };
    dom.rep.onchange = () => {
        if (dom.rep.files[0]) replaceSrc(dom.rep.files[0]);
    };

    document.getElementById("saveCropBtn").onclick = () => {
        const item = STATE.items[editIdx];
        if (cropper) item.crop = cropper.getData(true);
        if (item.assetSpec.m === "circle") item.maskCircle = dom.circleMaskToggle.checked;
        window.closeModal();
        renderGrid();
    };

    dom.btn.onclick = downloadZip;

    if (dom.psdToggle) {
        dom.psdToggle.onchange = function() {
            STATE.exportPsd = this.checked;
            if (this.checked && !window.writePsd) {
                dom.psdStatus.style.display = "inline";
                dom.psdStatus.textContent = STRINGS.psdLoading;
                dom.psdStatus.style.color = "#6B7280";
                loadPsdLib().then(function(ok) {
                    if (ok) {
                        dom.psdStatus.textContent = STRINGS.psdReady;
                        dom.psdStatus.style.color = "#22C55E";
                        setTimeout(function() { dom.psdStatus.style.display = "none"; }, 2000);
                    } else {
                        dom.psdStatus.textContent = STRINGS.psdFail;
                        dom.psdStatus.style.color = "#EF4444";
                        dom.psdToggle.checked = false;
                        STATE.exportPsd = false;
                    }
                });
            } else if (!this.checked) {
                dom.psdStatus.style.display = "none";
            }
        };
    }

    dom.slider.oninput = function () {
        const item = STATE.items[editIdx],
            spec = item.assetSpec;
        if (!cropper) return;
        const newValue = parseInt(this.value);
        if (spec.controlH) {
            cropper.setAspectRatio(item.currentW / newValue);
            item.currentH = newValue;
            dom.val.innerText = newValue + " px";
            if (spec.f || spec.oz) updateOverlay(spec, item.currentW, newValue);
        } else if (spec.maxW) {
            cropper.setAspectRatio(newValue / spec.h);
            item.currentW = newValue;
            dom.val.innerText = newValue + " px";
            if (spec.f || spec.oz) updateOverlay(spec, newValue, spec.h);
        }
    };

    dom.zoomSlider.oninput = function () {
        if (cropper) cropper.zoomTo(parseFloat(this.value));
    };

    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) && dom.safari) dom.safari.style.display = "block";
    showLoader(false);
});

// --- FUNZIONI GLOBALI ---
window.resetApp = function () {
    STATE.items = [];
    STATE.img = null;
    dom.step1.classList.remove("d-none");
    dom.step2.classList.add("d-none");
    dom.grid.innerHTML = "";
    dom.file.value = "";
};

window.closeModal = function () {
    const modal = bootstrap.Modal.getInstance(document.getElementById("editorModal"));
    if (modal) modal.hide();
};

window.updateCol = function (idx, i, val) {
    STATE.items[idx].svg.colors[i] = val;
    updateColorUI(idx);
};
window.manualHexObj = function (el, idx, i) {
    if (el.value.length === 7 && el.value.startsWith("#")) {
        STATE.items[idx].svg.colors[i] = el.value;
        updateColorUI(idx);
    }
};

function updateColorUI(idx) {
    renderGrid();
}

window.addCol = function (idx) {
    if (STATE.items[idx].svg.colors.length < 3) {
        STATE.items[idx].svg.colors.push("#FFFFFF");
        renderGrid();
    }
};

window.remCol = function (idx, colIndex) {
    typeof colIndex !== "undefined"
        ? STATE.items[idx].svg.colors.splice(colIndex, 1)
        : STATE.items[idx].svg.colors.pop();
    renderGrid();
};

window.setTheme = function (idx, t) {
    STATE.items[idx].svg.theme = t;
    window.autoFix(idx);
};

window.autoFix = function (idx) {
    const it = STATE.items[idx];
    const styles = resolveStyles(SITE_CONFIG[STATE.site], it.assetSpec, it.svg.theme);
    it.svg.colors = enforceContrast(it.svg.colors, styles);
    renderGrid();
};

window.editProjectName = function () {
    const newName = prompt("Modifica Nome Progetto:", STATE.slug);
    if (newName !== null) {
        STATE.slug = newName
            .trim()
            .replace(/[^a-z0-9-]/gi, "")
            .toLowerCase()
            .replace(/-/g, "_");
        document.getElementById("workspaceTitle").innerHTML =
            SITE_CONFIG[STATE.site].components[STATE.comp].label + " - " + (STATE.slug || "export") + ' <span class="icon icon-edit-slug" onclick="window.editProjectName()" title="Modifica nome">edit</span>';
        renderGrid();
    }
};

window.stepZoom = function (step) {
    if (cropper) cropper.zoom(step);
};

/* =========================================================================
   editCrop — MODIFICATA per supportare oz hint nel footer modale
   ========================================================================= */
window.editCrop = function (idx) {
    editIdx = idx;
    const item = STATE.items[idx],
        spec = item.assetSpec;
    dom.modalImg.src = "";
    if (cropper) cropper.destroy();

    // Hint text — aggiunto supporto oz
    let hintText = spec.f
        ? STRINGS.modalHintFocus
        : spec.m === "circle"
          ? STRINGS.modalHintCircle
          : STRINGS.modalHintGeneral;
    if (spec.oz && spec.oz.length > 0) {
        hintText += " " + STRINGS.modalHintOz;
    }
    document.getElementById("modalHintText").innerText = hintText;

    // Mostra/nascondi icone legenda oz nel footer
    const hasOzText  = spec.oz && spec.oz.some((z) => z.t === "text");
    const hasOzBadge = spec.oz && spec.oz.some((z) => z.t === "badge");
    const ozTextEl  = document.getElementById("modalOzTextHint");
    const ozBadgeEl = document.getElementById("modalOzBadgeHint");
    if (ozTextEl)  ozTextEl.style.display  = hasOzText  ? "inline-block" : "none";
    if (ozBadgeEl) ozBadgeEl.style.display = hasOzBadge ? "inline-block" : "none";

    dom.range.classList.remove("d-flex", "d-none");
    spec.m === "circle"
        ? (dom.modalCircleGroup.classList.remove("d-none"), (dom.circleMaskToggle.checked = item.maskCircle))
        : dom.modalCircleGroup.classList.add("d-none");

    if (spec.maxW || spec.controlH) {
        dom.range.classList.add("d-flex");
        dom.slider.min = spec.controlH ? spec.controlH.min : spec.w;
        dom.slider.max = spec.controlH ? spec.controlH.max : spec.maxW;
        dom.slider.step = spec.controlH ? spec.controlH.step : 1;
        dom.slider.value = spec.controlH ? item.currentH : item.currentW;
        dom.val.innerText = dom.slider.value + " px";
        dom.rangeLabel.innerText = spec.controlH ? STRINGS.height : STRINGS.width;
    } else dom.range.classList.add("d-none");

    dom.zoomSlider.value = 1;
    new bootstrap.Modal(dom.modal).show();
    setTimeout(() => {
        dom.modalImg.src = (item.customImg || STATE.img).src;
        dom.modalImg.onload = () => {
            cropper = new Cropper(dom.modalImg, {
                viewMode: 0,
                dragMode: "move",
                aspectRatio: item.currentW / (item.currentH || spec.h),
                autoCropArea: 1,
                guides: false,
                center: false,
                zoomable: true,
                scalable: true,
                toggleDragModeOnDblclick: false,
                data: item.crop,
                ready: () => {
                    if (spec.f || spec.oz) updateOverlay(spec, item.currentW, item.currentH);
                    if (spec.m === "circle") addCircleGuide();
                },
                zoom: (e) => {
                    dom.zoomSlider.value = e.detail.ratio;
                }
            });
        };
    }, 200);
};

/* =========================================================================
   updateOverlay — RISCRITTA per supportare Area Focus (f) + Overlay Zones (oz)

   f  (Area Focus):  dove METTERE il soggetto   → verde solido #22C55E
   oz (Overlay Zones):
     - type "text"  (Area Testi): testo/gradient UI   → ambra dashed #F59E0B
     - type "badge" (Area Loghi): loghi/premi         → rosso dashed #EF4444

   Tutti gli stili sono inline per non dipendere dal CSS esterno.
   ========================================================================= */
function updateOverlay(spec, w, h) {
    const box = document.querySelector(".cropper-crop-box");
    if (!box) return;

    // Rimuovi overlay precedenti
    let old = box.querySelector(".modal-focus-overlay");
    if (old) old.remove();
    box.querySelectorAll(".modal-oz-overlay").forEach((el) => el.remove());

    // Helper: crea un label overlay
    function makeLabel(text, bgColor) {
        const label = document.createElement("span");
        label.style.cssText = "font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.6px;"
            + "color:#fff;white-space:nowrap;padding:2px 6px;border-radius:3px;line-height:1;"
            + "text-shadow:0 1px 2px rgba(0,0,0,0.4);background:" + bgColor;
        label.textContent = text;
        return label;
    }

    // --- AREA FOCUS (f) — Verde: dove METTERE il soggetto ---
    if (spec.f) {
        const el = document.createElement("div");
        el.className = "modal-focus-overlay";
        let fY = spec.f.y,
            fH = spec.f.h;
        const deltaH = h - spec.h;
        if (deltaH > 0 && spec.controlH) {
            const initialFocus = SITE_CONFIG[STATE.site].components[STATE.comp].variants.find(
                (v) => v.id === STATE.variant
            )?.initialFocus;
            if (initialFocus === "center") fY += deltaH / 2;
            else if (initialFocus === "bottom") fY += deltaH;
        }
        // Stili inline — indipendenti dal CSS esterno
        el.style.position = "absolute";
        el.style.pointerEvents = "none";
        el.style.zIndex = "50";
        el.style.left = (spec.f.x / w) * 100 + "%";
        el.style.top = (fY / h) * 100 + "%";
        el.style.width = (spec.f.w / w) * 100 + "%";
        el.style.height = (fH / h) * 100 + "%";
        el.style.border = "2px solid rgba(34, 197, 94, 0.85)";
        el.style.background = "rgba(34, 197, 94, 0.08)";
        el.style.boxSizing = "border-box";
        el.style.display = "flex";
        el.style.alignItems = "flex-start";
        el.style.justifyContent = "center";
        el.style.padding = "4px";
        el.appendChild(makeLabel("Area Focus", "rgba(34, 197, 94, 0.55)"));
        box.appendChild(el);
    }

    // --- OVERLAY ZONES (oz): Area Testi / Area Loghi ---
    if (spec.oz && spec.oz.length > 0) {
        const palette = {
            text:  { border: "rgba(245, 158, 11, 0.90)", bg: "rgba(245, 158, 11, 0.15)", label: "rgba(245, 158, 11, 0.65)" },
            badge: { border: "rgba(239, 68, 68, 0.90)",  bg: "rgba(239, 68, 68, 0.15)",  label: "rgba(239, 68, 68, 0.65)" }
        };
        spec.oz.forEach((zone) => {
            const colors = palette[zone.t] || palette.text;
            const el = document.createElement("div");
            el.className = "modal-oz-overlay modal-oz-" + zone.t;
            el.style.position = "absolute";
            el.style.pointerEvents = "none";
            el.style.zIndex = "49";
            el.style.left   = (zone.x / w) * 100 + "%";
            el.style.top    = (zone.y / h) * 100 + "%";
            el.style.width  = (zone.w / w) * 100 + "%";
            el.style.height = (zone.h / h) * 100 + "%";
            el.style.border = "2px dashed " + colors.border;
            el.style.background = colors.bg;
            el.style.display = "flex";
            el.style.alignItems = "flex-end";
            el.style.justifyContent = "center";
            el.style.padding = "4px";
            el.style.boxSizing = "border-box";
            el.appendChild(makeLabel(zone.l, colors.label));
            box.appendChild(el);
        });
    }
}

function addCircleGuide() {
    const box = document.querySelector(".cropper-crop-box");
    if (box && !box.querySelector(".circle-guide-overlay")) {
        const guide = document.createElement("div");
        guide.className = "circle-guide-overlay";
        box.appendChild(guide);
    }
}

window.startReplace = function (idx) {
    repIdx = idx;
    dom.rep.click();
};

/* =========================================================================
   detectAssetFromFile(fileName, imgW, imgH)
   Analizza nome file, dimensioni immagine e (opzionalmente) layer PSD
   per identificare automaticamente canale, componente e variante.
   Restituisce l'oggetto match migliore oppure null.
   Segnali analizzati (peso decrescente):
     - filenamePrefix (40pt)
     - variant suffix nel nome file (15pt)
     - asset ID nel nome file (20pt)
     - dimensioni esatte @2x o @1x (15pt / 12pt)
     - aspect ratio compatibile (5pt)
     - layer PSD con nome corrispondente (8pt)
   Soglia minima per suggerire: 40 (almeno prefix + un altro segnale)
   ========================================================================= */
function detectAssetFromFile(fileName, imgW, imgH) {
    var base = (fileName || "")
        .replace(/.(webp|png|jpg|jpeg|psd|tiff?)$/i, "")
        .replace(/xd+@2x$/i, "")
        .replace(/@2x$/i, "");
    var baseLower = base.toLowerCase();
    if (!baseLower) return null;

    var best = null;
    var bestScore = 0;

    var psdLayers = (window._lastPsdInfo && window._lastPsdInfo.layers) || [];

    Object.keys(SITE_CONFIG).forEach(function(siteKey) {
        var site = SITE_CONFIG[siteKey];
        Object.keys(site.components).forEach(function(compKey) {
            var comp = site.components[compKey];
            var prefix = (comp.filenamePrefix || compKey).toLowerCase();

            var combos = [];
            if (comp.variants) {
                comp.variants.forEach(function(v) {
                    var vs = v.id === "main" ? "" : v.id.replace(/-/g, "").toLowerCase();
                    v.assets.forEach(function(a) {
                        combos.push({ variant: v.id, varLabel: v.label, varSuffix: vs, asset: a });
                    });
                });
            } else if (comp.assets) {
                comp.assets.forEach(function(a) {
                    combos.push({ variant: "main", varLabel: "", varSuffix: "", asset: a });
                });
            }

            combos.forEach(function(c) {
                if (c.asset.type !== "img") return;
                var score = 0;
                var slug = "";

                var fullPrefix = prefix + c.varSuffix;

                // 1) Prefisso completo (prefix + variant suffix)
                if (c.varSuffix && baseLower.indexOf(fullPrefix) === 0) {
                    var nc = baseLower[fullPrefix.length];
                    if (!nc || nc === "-") {
                        score += 40 + 15;
                        var rest = base.substring(fullPrefix.length).replace(/^-/, "");
                        var parts = rest.split("-");
                        if (parts[0] && parts[0].toLowerCase() === c.asset.id.toLowerCase()) {
                            score += 20;
                            slug = parts.slice(1).join("_");
                        } else if (c.asset.id === "main") {
                            score += 5;
                            slug = parts.filter(Boolean).join("_");
                        }
                    }
                }
                // 2) Solo prefisso (senza variant suffix)
                else if (baseLower.indexOf(prefix) === 0) {
                    var nc2 = baseLower[prefix.length];
                    if (!nc2 || nc2 === "-") {
                        score += 40;
                        var rest2 = base.substring(prefix.length).replace(/^-/, "");
                        var parts2 = rest2.split("-");
                        if (parts2[0] && parts2[0].toLowerCase() === c.asset.id.toLowerCase()) {
                            score += 20;
                            slug = parts2.slice(1).join("_");
                        } else if (c.asset.id === "main") {
                            score += 5;
                            slug = parts2.filter(Boolean).join("_");
                        }
                    }
                }

                // 3) Dimensioni immagine
                if (score > 0) {
                    var specW1 = c.asset.w;
                    var specH1 = c.asset.controlH ? c.asset.controlH.min : c.asset.h;
                    var specW2 = c.asset.d ? specW1 * 2 : specW1;
                    var specH2 = c.asset.d ? specH1 * 2 : specH1;

                    if (imgW === specW2 && imgH === specH2) score += 15;
                    else if (imgW === specW1 && imgH === specH1) score += 12;
                    else {
                        var specAR = specW1 / specH1;
                        var imgAR = imgW / imgH;
                        if (specAR > 0 && Math.abs(specAR - imgAR) / specAR < 0.03) score += 5;
                    }
                }

                // 4) Layer PSD con nomi corrispondenti
                if (score > 0 && psdLayers.length > 0) {
                    var assetLabel = c.asset.label.toLowerCase();
                    var compLabel = comp.label.toLowerCase();
                    psdLayers.forEach(function(ln) {
                        var lnLow = (ln || "").toLowerCase();
                        if (lnLow.indexOf(assetLabel) >= 0 || lnLow.indexOf(prefix) >= 0 || lnLow.indexOf(compLabel) >= 0) {
                            score += 8;
                        }
                    });
                }

                if (score > bestScore) {
                    bestScore = score;
                    best = {
                        score: score,
                        site: siteKey,
                        siteLabel: site.label,
                        comp: compKey,
                        compLabel: comp.label,
                        variant: c.variant,
                        varLabel: c.varLabel,
                        slug: slug.replace(/^_+|_+$/g, "")
                    };
                }
            });
        });
    });

    return best && bestScore >= 40 ? best : null;
}

/* Applica il match rilevato: switch selettori UI + slug */
function applyDetectedMatch(match) {
    STATE.site = match.site;
    dom.site.value = match.site;
    localStorage.setItem("katana_site", match.site);

    // Ricostruisci dropdown componenti per il nuovo sito
    var components = SITE_CONFIG[match.site].components;
    dom.comp.innerHTML = "";
    Object.keys(components).forEach(function(k) {
        var o = document.createElement("option");
        o.value = k; o.text = components[k].label;
        dom.comp.add(o);
    });
    dom.comp.value = match.comp;
    STATE.comp = match.comp;

    // Ricostruisci varianti per il componente rilevato
    updateVariantList();
    if (match.variant && match.variant !== "main" && dom.variant) {
        dom.variant.value = match.variant;
        STATE.variant = match.variant;
    }
    updateSpecs();

    // Imposta slug se estratto dal nome file
    if (match.slug) {
        STATE.slug = match.slug;
        dom.slug.value = match.slug;
    }
}

/* =========================================================================
   showDetectModal(match, fileName, onConfirm, onCancel)
   Modale custom in stile Katana brutalist per conferma auto-detection.
   Crea il DOM dinamicamente, lo rimuove alla chiusura.
   ========================================================================= */
function showDetectModal(match, fileName, onConfirm, onCancel) {
    var prev = document.getElementById("detectOverlay");
    if (prev) prev.parentNode.removeChild(prev);

    var overlay = document.createElement("div");
    overlay.id = "detectOverlay";
    overlay.className = "detect-overlay";

    var dialog = document.createElement("div");
    dialog.className = "detect-dialog";

    // Header
    var header = document.createElement("div");
    header.className = "detect-header";
    var hIcon = document.createElement("span");
    hIcon.className = "icon";
    hIcon.textContent = "auto_awesome";
    var hTitle = document.createElement("h5");
    hTitle.textContent = STRINGS.detectTitle;
    header.appendChild(hIcon);
    header.appendChild(hTitle);

    // Body
    var body = document.createElement("div");
    body.className = "detect-body";

    function addRow(label, value) {
        var row = document.createElement("div");
        row.className = "detect-row";
        var lbl = document.createElement("span");
        lbl.className = "detect-label";
        lbl.textContent = label;
        var val = document.createElement("span");
        val.className = "detect-value";
        val.textContent = value;
        row.appendChild(lbl);
        row.appendChild(val);
        body.appendChild(row);
    }

    addRow(STRINGS.detectFileName, fileName);
    addRow(STRINGS.detectChannel, match.siteLabel);
    addRow(STRINGS.detectComponent, match.compLabel);
    if (match.varLabel) addRow(STRINGS.detectVariant, match.varLabel);
    if (match.slug) addRow(STRINGS.detectSlug, match.slug);

    // Footer
    var footer = document.createElement("div");
    footer.className = "detect-footer";

    var hint = document.createElement("span");
    hint.className = "detect-hint";
    hint.textContent = STRINGS.detectConfirm;

    var btnCancel = document.createElement("button");
    btnCancel.className = "detect-btn detect-btn-cancel";
    btnCancel.textContent = STRINGS.detectBtnCancel;

    var btnConfirm = document.createElement("button");
    btnConfirm.className = "detect-btn detect-btn-confirm";
    btnConfirm.textContent = STRINGS.detectBtnConfirm;

    footer.appendChild(hint);
    footer.appendChild(btnCancel);
    footer.appendChild(btnConfirm);

    dialog.appendChild(header);
    dialog.appendChild(body);
    dialog.appendChild(footer);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    function cleanup() {
        document.removeEventListener("keydown", onKey);
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }
    btnConfirm.onclick = function() { cleanup(); onConfirm(); };
    btnCancel.onclick  = function() { cleanup(); onCancel(); };
    overlay.onclick = function(e) { if (e.target === overlay) { cleanup(); onCancel(); } };
    function onKey(e) { if (e.key === "Escape") { cleanup(); onCancel(); } }
    document.addEventListener("keydown", onKey);
    setTimeout(function() { btnConfirm.focus(); }, 50);
}

function loadMaster(file) {
    showLoader(true, STRINGS.assetAnalysis);
    fileToDataUrl(file, function(dataUrl) {
        if (!dataUrl) { showLoader(false); return; }
        const img = new Image();
        img.onload = () => {
            STATE.img = img;
            STATE.colors.raw = extractColors(img);

            function finishLoad() {
                window._lastPsdInfo = null;
                setTimeout(runSmartCrop, 100);
            }

            // --- Smart Detection: identifica componente/variante dal file ---
            var match = detectAssetFromFile(file.name, img.width, img.height);
            if (match) {
                var isSame = (match.site === STATE.site && match.comp === STATE.comp && match.variant === STATE.variant);
                if (!isSame) {
                    showDetectModal(match, file.name,
                        function() { applyDetectedMatch(match); finishLoad(); },
                        function() { finishLoad(); }
                    );
                    return;
                } else if (match.slug && match.slug !== STATE.slug) {
                    STATE.slug = match.slug;
                    dom.slug.value = match.slug;
                }
            }
            finishLoad();
        };
        img.src = dataUrl;
    });
}

function replaceSrc(file) {
    fileToDataUrl(file, function(dataUrl) {
        if (!dataUrl) return;
        const img = new Image();
        img.onload = () => {
            STATE.items[repIdx].customImg = img;
            renderGrid();
        };
        img.src = dataUrl;
    });
}

// Generazione layout intelligente (senza Pica se necessario)
async function runSmartCrop() {
    const assets = getActiveAssets();
    STATE.items = [];
    const smCanvas = document.createElement("canvas");
    const scale = Math.min(1, 600 / STATE.img.width);
    smCanvas.width = STATE.img.width * scale;
    smCanvas.height = STATE.img.height * scale;
    smCanvas.getContext("2d").drawImage(STATE.img, 0, 0, smCanvas.width, smCanvas.height);

    for (let a of assets) {
        let item = {
            assetSpec: a,
            type: a.type,
            currentW: a.w,
            currentH: a.controlH ? a.controlH.min : a.h,
            initialH: a.h,
            currentD: a.d,
            customImg: null,
            currentFocus: "center",
            maskCircle: a.m === "circle"
        };
        if (a.type === "svg") {
            let cols = [STATE.colors.raw[0], STATE.colors.raw[2]];
            let theme = tinycolor(cols[0]).isLight() ? "light" : "dark";
            item.svg = {
                colors: enforceContrast(cols, resolveStyles(SITE_CONFIG[STATE.site], a.assetSpec, theme)),
                theme: theme
            };
        } else {
            const res = await smartcrop.crop(smCanvas, {
                width: item.currentW,
                height: item.currentH,
                ruleOfThirds: true
            });
            item.crop = {
                x: res.topCrop.x / scale,
                y: res.topCrop.y / scale,
                width: res.topCrop.width / scale,
                height: res.topCrop.height / scale
            };
        }
        STATE.items.push(item);
    }
    renderGrid();
    showLoader(false);
    dom.step1.classList.add("d-none");
    dom.step2.classList.remove("d-none");
    document.getElementById("workspaceTitle").innerHTML =
        SITE_CONFIG[STATE.site].components[STATE.comp].label + " - " + (STATE.slug || "export") + ' <span class="icon icon-edit-slug" onclick="window.editProjectName()" title="Modifica nome">edit</span>';
}

// Renderizza le card nella griglia
function renderGrid() {
    dom.grid.innerHTML = "";
    STATE.items.forEach((item, idx) => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-xl-4";
        const fname = getFilename(item);

        if (item.type === "svg") {
            const styles = resolveStyles(SITE_CONFIG[STATE.site], item.assetSpec, item.svg.theme);
            const fixBtn = !checkContrast(item.svg.colors, styles).ok
                ? '<button class="btn-fix-floating" onclick="window.autoFix(' + idx + ')"><span class="icon">auto_fix_high</span> ' + STRINGS.fixButton + '</button>'
                : "";
            let colorSlotsHTML = "";
            for (let i = 0; i < 3; i++) {
                colorSlotsHTML += item.svg.colors[i]
                    ? '<div class="color-slot"><div class="color-dot" style="background:' + item.svg.colors[i] + '"><input type="color" value="' + item.svg.colors[i] + '" oninput="window.updateCol(' + idx + ',' + i + ',this.value)"></div>' + (i > 0 ? '<div class="btn-remove-slot" onclick="window.remCol(' + idx + ', ' + i + ')"><span class="icon">close</span></div>' : '') + '<input type="text" class="hex-input" value="' + item.svg.colors[i] + '" onchange="window.manualHexObj(this, ' + idx + ', ' + i + ')"></div>'
                    : '<div class="color-slot"><div class="slot-placeholder" onclick="window.addCol(' + idx + ')" title="Aggiungi"><span class="icon">add</span></div><div class="slot-label">' + STRINGS.add + '</div></div>';
            }
            col.innerHTML =
                '<div class="asset-card">'
                + '<div class="card-header-custom"><span class="card-label">' + item.assetSpec.label + '</span><span class="icon">' + STRINGS.iconPalette + '</span></div>'
                + '<div class="workspace-area">'
                +     '<div class="bg-preview-box shadow-sm" style="background:linear-gradient(180deg, ' + item.svg.colors.join(", ") + '); width:100%; height:100%; display:flex; justify-content:center; align-items:center;">'
                +         '<div class="text-center p-2 d-flex flex-column align-items-center">'
                +             '<div class="text-preview mb-2" style="color:' + styles.text + '">' + STRINGS.svgTextPreview + '</div>'
                +             '<span class="cta-preview" style="background:' + styles.btnBg + '; color:' + styles.btnLabel + '">' + STRINGS.svgCtaPreview + '</span>'
                +         '</div>'
                +     '</div>' + fixBtn
                + '</div>'
                + '<div class="card-body-custom">'
                +     '<div class="d-flex gap-2 justify-content-center mb-2">'
                +         '<button class="btn-toggle ' + (item.svg.theme === "light" ? "active" : "") + '" onclick="window.setTheme(' + idx + ',&#39;light&#39;)"><span class="icon icon-sm">light_mode</span> ' + STRINGS.themeLight + '</button>'
                +         '<button class="btn-toggle ' + (item.svg.theme === "dark" ? "active" : "") + '" onclick="window.setTheme(' + idx + ',&#39;dark&#39;)"><span class="icon icon-sm">dark_mode</span> ' + STRINGS.themeDark + '</button>'
                +     '</div>'
                +     '<div class="color-row">' + colorSlotsHTML + '</div>'
                +     '<div class="filename-pill mt-auto">' + fname + '</div>'
                + '</div>'
                + '</div>';
        } else {
            const cvs = document.createElement("canvas");
            cvs.width = item.currentW;
            cvs.height = item.currentH;
            const ctx = cvs.getContext("2d");
            ctx.drawImage(
                item.customImg || STATE.img,
                item.crop.x,
                item.crop.y,
                item.crop.width,
                item.crop.height,
                0,
                0,
                item.currentW,
                item.currentH
            );
            if (item.maskCircle) {
                ctx.globalCompositeOperation = "destination-in";
                ctx.beginPath();
                ctx.arc(
                    item.currentW / 2,
                    item.currentH / 2,
                    Math.min(item.currentW, item.currentH) / 2,
                    0,
                    2 * Math.PI
                );
                ctx.fill();
                ctx.globalCompositeOperation = "source-over";
            }

            /* --- oz info nella meta-box (aggiunta) --- */
            var ozHtml = (item.assetSpec.oz && item.assetSpec.oz.length > 0)
                ? '<div class="meta-item"><span class="meta-label">' + STRINGS.overlayZones + '</span><span class="meta-value">' + item.assetSpec.oz.map((z) => z.l).join(", ") + '</span></div>'
                : "";

            col.innerHTML =
                '<div class="asset-card">'
                + '<div class="card-header-custom"><span class="card-label">' + item.assetSpec.label + '</span><span class="icon">' + STRINGS.iconImage + '</span></div>'
                + '<div class="workspace-area"><div class="canvas-preview ' + (item.maskCircle ? "is-circle" : "") + '"></div></div>'
                + '<div class="card-body-custom">'
                +     '<div class="d-flex gap-2 mb-2">'
                +         '<button class="btn-action" onclick="window.editCrop(' + idx + ')"><span class="icon">crop</span> ' + STRINGS.editCrop + '</button>'
                +         '<button class="btn-action" onclick="window.startReplace(' + idx + ')"><span class="icon">folder_open</span> ' + STRINGS.replace + '</button>'
                +     '</div>'
                +     '<div class="meta-box">'
                +         '<div class="meta-item"><span class="meta-label">' + STRINGS.dimensions + '</span><span class="meta-value">' + item.currentW + 'x' + item.currentH + ' px</span></div>'
                +         '<div class="meta-item"><span class="meta-label">' + STRINGS.targetWeight + '</span><span class="meta-highlight">&lt; ' + item.assetSpec.targetKB + ' KB</span></div>'
                +         (item.assetSpec.fl ? '<div class="meta-item"><span class="meta-label">' + STRINGS.focus + '</span><span class="meta-value">' + item.assetSpec.fl + '</span></div>' : "")
                +         ozHtml
                +     '</div>'
                +     '<div class="filename-pill">' + fname + '</div>'
                + '</div>'
                + '</div>';
            setTimeout(() => col.querySelector(".canvas-preview").appendChild(cvs), 0);
        }
        dom.grid.appendChild(col);
    });
}

// --- FUNZIONI DI EXPORT (NATIVE, NO PICA) ---

/* =========================================================================
   generatePsd(item)
   Genera un buffer PSD con 3 layer:
   1. "Overlay"   (nascosto) — Focus area + Overlay Zones
   2. "Ritaglio"  (visibile) — Immagine intera riposizionata (non tagliata),
      la crop area coincide con il canvas PSD
   3. "Sorgente"  (nascosto) — Immagine originale a risoluzione piena 1:1
   Richiede ag-psd caricato come modulo (window.writePsd).
   ========================================================================= */
async function generatePsd(item) {
    if (typeof window.writePsd !== "function") return null;
    var spec = item.assetSpec;
    var w = spec.d ? item.currentW * 2 : item.currentW;
    var h = spec.d ? item.currentH * 2 : item.currentH;
    var s = spec.d ? 2 : 1;
    var src = item.customImg || STATE.img;

    // --- Layer: Ritaglio (immagine intera riposizionata, qualità sorgente) ---
    // Scala: il rettangolo di crop (in pixel sorgente) deve mappare esattamente
    // sul canvas PSD (w x h). L'immagine completa viene scalata e posizionata
    // in modo che la parte fuori-crop sporga oltre i bordi del canvas.
    var sx = w / item.crop.width;
    var sy = h / item.crop.height;
    var layerW = Math.round(src.width * sx);
    var layerH = Math.round(src.height * sy);
    var layerLeft = Math.round(-item.crop.x * sx);
    var layerTop = Math.round(-item.crop.y * sy);

    var cropCvs = document.createElement("canvas");
    cropCvs.width = layerW;
    cropCvs.height = layerH;
    var cropCtx = cropCvs.getContext("2d");
    cropCtx.imageSmoothingEnabled = true;
    cropCtx.imageSmoothingQuality = "high";
    cropCtx.drawImage(src, 0, 0, layerW, layerH);

    var cropLeft = layerLeft;
    var cropTop = layerTop;

    // Per maschera circolare: layer classico ritagliato (circle mask non supporta offset)
    if (item.maskCircle) {
        var mcCvs = document.createElement("canvas");
        mcCvs.width = w; mcCvs.height = h;
        var mcCtx = mcCvs.getContext("2d");
        mcCtx.imageSmoothingEnabled = true;
        mcCtx.imageSmoothingQuality = "high";
        mcCtx.drawImage(src, item.crop.x, item.crop.y, item.crop.width, item.crop.height, 0, 0, w, h);
        var tmpCvs = document.createElement("canvas");
        tmpCvs.width = w; tmpCvs.height = h;
        var tmpCtx = tmpCvs.getContext("2d");
        tmpCtx.beginPath();
        tmpCtx.arc(w / 2, h / 2, Math.min(w, h) / 2, 0, 2 * Math.PI);
        tmpCtx.clip();
        tmpCtx.drawImage(mcCvs, 0, 0);
        cropCvs = tmpCvs;
        cropLeft = 0;
        cropTop = 0;
    }

    // --- Layer: Sorgente (nascosto, risoluzione originale 1:1) ---
    var srcCvs = document.createElement("canvas");
    srcCvs.width = src.width;
    srcCvs.height = src.height;
    var srcCtx = srcCvs.getContext("2d");
    srcCtx.drawImage(src, 0, 0);

    // --- Layer: Overlay (focus + oz, nascosto) ---
    var ozCvs = document.createElement("canvas");
    ozCvs.width = w; ozCvs.height = h;
    var ozCtx = ozCvs.getContext("2d");
    var hasOverlay = false;

    // Area Focus — verde #22C55E
    if (spec.f) {
        hasOverlay = true;
        var fY = spec.f.y, fH = spec.f.h;
        var deltaH = item.currentH - spec.h;
        if (deltaH > 0 && spec.controlH) {
            var comp = SITE_CONFIG[STATE.site].components[STATE.comp];
            var activeVar = comp.variants ? comp.variants.find(function(v) { return v.id === STATE.variant; }) : null;
            var initF = activeVar ? activeVar.initialFocus : null;
            if (initF === "center") fY += deltaH / 2;
            else if (initF === "bottom") fY += deltaH;
        }
        ozCtx.fillStyle = "rgba(34,197,94,0.15)";
        ozCtx.strokeStyle = "#22C55E";
        ozCtx.lineWidth = 2 * s;
        ozCtx.fillRect(spec.f.x * s, fY * s, spec.f.w * s, fH * s);
        ozCtx.strokeRect(spec.f.x * s, fY * s, spec.f.w * s, fH * s);
        ozCtx.font = "bold " + (11 * s) + "px Inter, sans-serif";
        ozCtx.fillStyle = "#22C55E";
        ozCtx.fillText("Area Focus", (spec.f.x + 6) * s, (fY + 16) * s);
    }

    // Overlay Zones — text: ambra #F59E0B, badge: rosso #EF4444
    if (spec.oz && spec.oz.length > 0) {
        hasOverlay = true;
        var pal = {
            text:  { fill: "rgba(245,158,11,0.15)", stroke: "#F59E0B" },
            badge: { fill: "rgba(239,68,68,0.15)",  stroke: "#EF4444" }
        };
        spec.oz.forEach(function(zone) {
            var c = pal[zone.t] || pal.text;
            ozCtx.fillStyle = c.fill;
            ozCtx.strokeStyle = c.stroke;
            ozCtx.lineWidth = 2 * s;
            ozCtx.setLineDash([6 * s, 4 * s]);
            ozCtx.fillRect(zone.x * s, zone.y * s, zone.w * s, zone.h * s);
            ozCtx.strokeRect(zone.x * s, zone.y * s, zone.w * s, zone.h * s);
            ozCtx.setLineDash([]);
            ozCtx.font = "bold " + (11 * s) + "px Inter, sans-serif";
            ozCtx.fillStyle = c.stroke;
            ozCtx.fillText(zone.l, (zone.x + 6) * s, (zone.y + zone.h - 8) * s);
        });
    }

    // Costruzione PSD: layer dal top al bottom (Photoshop order)
    var children = [];
    if (hasOverlay) {
        children.push({ name: "Overlay", canvas: ozCvs, hidden: true });
    }
    children.push({ name: "Ritaglio", canvas: cropCvs, left: cropLeft, top: cropTop });
    children.push({ name: "Sorgente", canvas: srcCvs, left: 0, top: 0, hidden: true });

    // Composite (thumbnail per Finder/Explorer): immagine croppata alle dimensioni canvas
    var compCvs = document.createElement("canvas");
    compCvs.width = w; compCvs.height = h;
    var compCtx = compCvs.getContext("2d");
    compCtx.imageSmoothingEnabled = true;
    compCtx.imageSmoothingQuality = "high";
    compCtx.drawImage(src, item.crop.x, item.crop.y, item.crop.width, item.crop.height, 0, 0, w, h);
    if (item.maskCircle) {
        var mcComp = document.createElement("canvas");
        mcComp.width = w; mcComp.height = h;
        var mcCompCtx = mcComp.getContext("2d");
        mcCompCtx.beginPath();
        mcCompCtx.arc(w / 2, h / 2, Math.min(w, h) / 2, 0, 2 * Math.PI);
        mcCompCtx.clip();
        mcCompCtx.drawImage(compCvs, 0, 0);
        compCvs = mcComp;
    }

    try {
        return window.writePsd({ width: w, height: h, canvas: compCvs, children: children });
    } catch (e) {
        console.warn("PSD generation failed:", e);
        return null;
    }
}

async function downloadZip() {
    showLoader(true, STRINGS.zipping);
    const zip = new JSZip();
    let zipSuffix =
        STATE.items.find((c) => c.type === "svg")?.svg.theme === "light"
            ? "_onLight"
            : STATE.items.find((c) => c.type === "svg")?.svg.theme === "dark"
              ? "_onDark"
              : "";
    let zipFolderName = (SITE_CONFIG[STATE.site].components[STATE.comp].filenamePrefix || STATE.comp) + "_" + (STATE.slug || "export") + zipSuffix;
    const folder = zip.folder(zipFolderName);

    for (let item of STATE.items) {
        const fname = getFilename(item);
        if (item.type === "svg") {
            const stops = item.svg.colors
                .map(
                    (c, i) =>
                        '<stop offset="' + Math.round((i / (item.svg.colors.length - 1)) * 100) + '%" stop-color="' + c + '"/>'
                )
                .join("");
            let svg =
                item.svg.colors.length === 1
                    ? '<svg xmlns="http://www.w3.org/2000/svg" width="' + item.assetSpec.w + '" height="' + item.assetSpec.h + '" viewBox="0 0 ' + item.assetSpec.w + ' ' + item.assetSpec.h + '"><rect width="100%" height="100%" fill="' + item.svg.colors[0] + '"/></svg>'
                    : '<svg xmlns="http://www.w3.org/2000/svg" width="' + item.assetSpec.w + '" height="' + item.assetSpec.h + '" viewBox="0 0 ' + item.assetSpec.w + ' ' + item.assetSpec.h + '"><defs><linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">' + stops + '</linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>';
            folder.file(fname, new Blob([svg], { type: "image/svg+xml" }));
        } else {
            const w = item.assetSpec.d ? item.currentW * 2 : item.currentW;
            const h = item.assetSpec.d ? item.currentH * 2 : item.currentH;

            // Creazione canvas finale (ridimensionamento nativo)
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");

            // Abilita interpolazione di qualità del browser
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            ctx.drawImage(
                item.customImg || STATE.img,
                item.crop.x,
                item.crop.y,
                item.crop.width,
                item.crop.height,
                0,
                0,
                w,
                h
            );

            if (item.maskCircle) {
                const mC = document.createElement("canvas");
                mC.width = w;
                mC.height = h;
                const mCtx = mC.getContext("2d");
                mCtx.beginPath();
                mCtx.arc(w / 2, h / 2, w / 2, 0, 2 * Math.PI);
                mCtx.clip();
                mCtx.drawImage(canvas, 0, 0);
                folder.file(fname, await compressToTarget(mC, item.assetSpec.targetKB || 200));
            } else {
                folder.file(fname, await compressToTarget(canvas, item.assetSpec.targetKB || 200));
            }

            // Generazione PSD
            if (STATE.exportPsd) {
                const psdBuf = await generatePsd(item);
                if (psdBuf) {
                    folder.file(fname.replace(/.webp$/, ".psd"), psdBuf);
                }
            }
        }
    }
    zip.generateAsync({ type: "blob" }).then((c) => {
        saveAs(c, zipFolderName + ".zip");
        showLoader(false);
    });
}

// Compressione Nativa (senza Pica)
function canvasToBlob(canvas, quality) {
    return new Promise((resolve) => canvas.toBlob(resolve, "image/webp", quality));
}

async function compressToTarget(canvas, maxKB) {
    let q = 0.9;
    let blob = await canvasToBlob(canvas, q);
    while (blob.size > maxKB * 1024 && q > 0.1) {
        q -= 0.05;
        blob = await canvasToBlob(canvas, Math.round(q * 100) / 100);
    }
    return blob;
}

// Caricamento libreria PSD (lazy, on-demand via dynamic import)
async function loadPsdLib() {
    if (window.writePsd && window.readPsd) return true;
    try {
        var mod = await import("https://cdn.jsdelivr.net/npm/ag-psd/+esm");
        if (mod.initializeCanvas) {
            mod.initializeCanvas(function(w, h) {
                var c = document.createElement("canvas");
                c.width = w; c.height = h;
                return c;
            });
        }
        window.writePsd = mod.writePsd;
        window.readPsd = mod.readPsd;
        console.log("ag-psd loaded successfully");
        return true;
    } catch(e) {
        console.error("Failed to load ag-psd:", e);
        return false;
    }
}

// Helper: converte un File (immagine o PSD) in data-URL utilizzabile da <img>
function fileToDataUrl(file, callback) {
    var isPsd = file.name && file.name.toLowerCase().endsWith(".psd");
    window._lastPsdInfo = null;
    if (isPsd) {
        loadPsdLib().then(function(ok) {
            if (!ok) { callback(null); return; }
            file.arrayBuffer().then(function(buf) {
                try {
                    var psd = window.readPsd(new Uint8Array(buf));
                    if (psd.canvas) {
                        // Memorizza info layer PSD per smart detection
                        window._lastPsdInfo = {
                            layers: (psd.children || []).map(function(c) { return c.name || ""; }),
                            width: psd.width,
                            height: psd.height
                        };
                        callback(psd.canvas.toDataURL("image/png"));
                    } else {
                        console.error("PSD has no composite canvas");
                        callback(null);
                    }
                } catch(e) {
                    console.error("PSD parse error:", e);
                    callback(null);
                }
            });
        });
    } else {
        var reader = new FileReader();
        reader.onload = function(e) { callback(e.target.result); };
        reader.readAsDataURL(file);
    }
}
`,Er=`/* ==========================================================================
   KATANA STYLESHEET
   --------------------------------------------------------------------------
   1. Design Tokens & Variables
   2. Base Styles & Typography
   3. Layout & Navigation
   4. Configuration Card & Inputs
   5. Asset Cards & Workspace
   6. Buttons & Interactive
   7. SVG Color Picker Tools
   8. Modal Editor (CropperJS Overrides)
   9. Utilities & Responsive
   10. Detect Modal (Smart Asset Recognition)
   ========================================================================== */

/* ==========================================================================
   1. DESIGN TOKENS & VARIABLES
   Definizione palette colori e valori riutilizzabili.
   ========================================================================== */
:root {
    /* PALETTE */
    --primary: #1a1a1a;
    --primary-hover: #000000;
    --accent: #e63946;
    --guide-color: #00e5ff;

    /* UI COLORS */
    --surface: #ffffff;
    --surface-dim: #f4f4f4;
    --text-main: #111111;
    --text-sub: #555555;
    --text-muted: #888888;
    --border-color: #e0e0e0;

    /* GEOMETRY & EFFECTS */
    --radius-base: 0px; /* Brutalist design choice */
    --radius-preview-btn: 50px;
    --shadow-solid: 6px 6px 0px rgba(0, 0, 0, 0.08); /* Ombra solida stile retrò */
    --shadow-focus: 3px 3px 0 var(--accent);
}

/* ==========================================================================
   2. BASE STYLES & TYPOGRAPHY
   ========================================================================== */
body {
    background-color: #ffffff;
    /* BACKGROUND: Griglia tecnica leggera generata via CSS gradient */
    background-image: linear-gradient(#f4f4f4 1px, transparent 1px),
        linear-gradient(90deg, #f4f4f4 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: -1px -1px;

    font-family: "Inter", sans-serif;
    color: var(--text-main);
    padding-bottom: 120px;
    -webkit-font-smoothing: antialiased; /* Font rendering migliorato su Mac */
}

/* Typography Overrides */
h4,
.h4 {
    font-size: 1.1rem !important;
    font-weight: 800;
    letter-spacing: -0.5px;
    text-transform: uppercase;
}
h5,
.h5 {
    font-size: 0.9rem !important;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

/* Material Symbols setup */
.icon {
    font-family: "Material Symbols Outlined";
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    line-height: 1;
    display: inline-block;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none; /* Previene selezione testo accidentale */
}

.text-on-grid {
    line-height: 40px; /* Allinea il testo alla griglia di sfondo */
    margin-bottom: 40px !important;
}

/* ==========================================================================
   3. LAYOUT & NAVIGATION
   ========================================================================== */
.navbar-custom {
    background: rgba(255, 255, 255, 0.95);
    border-bottom: 2px solid var(--primary);
    padding: 16px 0;
    margin-bottom: 40px;
    position: sticky;
    top: 0;
    z-index: 1000; /* Assicura che la navbar stia sopra tutto */
    box-shadow: none;
}

.brand-logo {
    font-weight: 900;
    color: var(--primary);
    font-size: 1.5rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 16px;
    letter-spacing: 2px;
    text-transform: uppercase;
}
.brand-logo svg {
    fill: currentColor;
}

.version-pill {
    background: var(--primary);
    color: white;
    padding: 4px 8px;
    border-radius: var(--radius-base);
    font-size: 0.7rem;
    font-family: monospace;
    font-weight: 700;
}

.container-grid {
    width: 100%;
    padding-right: 20px;
    padding-left: 20px;
    margin-right: auto;
    margin-left: auto;
}

/* ==========================================================================
   4. CONFIGURATION CARD & INPUTS
   Stile personalizzato per select e input text per matchare il look "Technical"
   ========================================================================== */
.config-card {
    background: var(--surface);
    border: 1px solid var(--primary);
    padding: 40px;
    margin-bottom: 24px;
    box-shadow: var(--shadow-solid);
}

.input-group-custom {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-base);
    display: flex;
    align-items: center;
    padding: 4px 8px;
    transition: all 0.1s ease;
    min-height: 48px;
}
.input-group-custom:focus-within {
    border-color: var(--primary);
    box-shadow: var(--shadow-focus);
}
/* Override Bootstrap focus styles */
.form-control:focus,
.form-select:focus {
    border-color: var(--primary) !important;
    box-shadow: none !important;
}

.input-icon {
    padding: 0 12px;
    color: var(--text-main);
    flex-shrink: 0;
}

.input-group-custom .form-control,
.input-group-custom .form-select {
    border: none;
    background: transparent;
    padding: 12px 4px;
    font-weight: 500;
    color: var(--text-main);
    box-shadow: none;
    font-family: monospace;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.input-label-sm {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-main);
    text-transform: uppercase;
    margin-left: 0;
    margin-bottom: 8px;
    display: block;
    letter-spacing: 1px;
}

/* Chip per visualizzare i pesi target previsti */
.spec-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--surface-dim);
    border: 1px solid var(--border-color);
    padding: 6px 12px;
    border-radius: var(--radius-base);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-main);
}
.spec-chip .icon {
    font-size: 16px;
    color: var(--primary);
}

/* ==========================================================================
   5. ASSET CARDS & WORKSPACE
   ========================================================================== */
.asset-card {
    background: var(--surface);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-base);
    overflow: hidden;
    transition: all 0.2s;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}
.asset-card:hover {
    border-color: var(--primary);
    box-shadow: var(--shadow-solid);
    transform: translate(-2px, -2px);
}

.card-header-custom {
    padding: 12px 20px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fafafa;
}
.card-header-custom .icon {
    color: var(--text-main) !important;
}

.card-label {
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--text-main);
    letter-spacing: 1px;
}

/* Area che contiene il Canvas o l'anteprima SVG */
.workspace-area {
    background-color: #fcfcfc;
    /* Pattern a punti */
    background-image: radial-gradient(#d0d0d0 1px, transparent 1px);
    background-size: 20px 20px;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    padding: 24px;
    border-bottom: 1px solid var(--border-color);
}
.workspace-area canvas {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    max-width: 100%;
    max-height: 100%;
    background: white;
    transition: all 0.3s ease;
}
/* Effetto ombra specifico per immagini circolari */
.workspace-area .canvas-preview.is-circle canvas {
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.15));
}
.workspace-area .canvas-preview {
    display: flex;
    align-items: center;
    justify-content: center;
}

/* DRAG & DROP ZONE */
.drop-zone {
    background-color: white;
    border: 2px dashed #ccc;
    border-radius: var(--radius-base);
    padding: 60px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
}
.drop-zone:hover {
    border-color: var(--accent);
    background-color: #fffafa;
}
.drop-icon-wrapper {
    width: 48px;
    height: 48px;
    border: 2px solid var(--text-main);
    border-radius: var(--radius-base);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    transition: all 0.2s;
}
.drop-zone:hover .drop-icon-wrapper {
    background: var(--accent);
    border-color: var(--accent);
    color: white;
    transform: rotate(90deg);
}

/* ==========================================================================
   6. BUTTONS & INTERACTIVE
   ========================================================================== */
.card-body-custom {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: white;
}

/* Main CTA Button */
.btn-pill-primary {
    background-color: var(--accent);
    color: white;
    border: none;
    padding: 14px 32px;
    border-radius: var(--radius-base);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}
.btn-pill-primary:hover {
    background-color: black;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Secondary Actions inside cards */
.btn-action {
    width: 100%;
    background: white;
    color: var(--text-main);
    border: 1px solid var(--border-color);
    padding: 10px 16px;
    border-radius: var(--radius-base);
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
    flex: 1;
}
.btn-action:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
}

.btn-ghost {
    background: #f0f0f0;
    color: var(--text-main);
    border: 1px solid transparent;
    padding: 8px 16px;
    border-radius: var(--radius-base);
    font-weight: 600;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
    text-transform: uppercase;
}
.btn-ghost:hover {
    background: #e0e0e0;
    color: black;
}

/* Theme Toggle (Light/Dark) in SVG cards */
.btn-toggle {
    flex: 1;
    padding: 8px;
    border-radius: var(--radius-base);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid var(--border-color);
    background: white;
    color: var(--text-sub);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s;
}
.btn-toggle:hover {
    border-color: var(--primary);
    color: var(--primary);
}
.btn-toggle.active {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
}

.icon-edit-slug {
    font-size: 20px;
    color: var(--text-main);
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.2s;
    margin-left: 12px;
    vertical-align: middle;
    display: inline-block;
    transform: translateY(-2px);
}
.icon-edit-slug:hover {
    opacity: 1;
    color: var(--accent);
    transform: translateY(-2px) scale(1.1);
}

/* --- META BOX INFO --- */
.meta-box {
    background: var(--surface-dim);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-base);
    padding: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px 8px;
}

.meta-item {
    display: flex;
    flex-direction: column;
    flex: 1 0 40%;
    min-width: 100px;
}

.meta-label {
    font-size: 0.6rem;
    font-weight: 800;
    color: #888;
    text-transform: uppercase;
    margin-bottom: 4px;
    display: block;
}

.meta-value,
.meta-highlight {
    font-size: 0.8rem;
    font-family: monospace;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.meta-value {
    color: var(--text-main);
}
.meta-highlight {
    color: var(--accent);
}

.filename-pill {
    font-family: "Consolas", monospace;
    font-size: 0.7rem;
    color: var(--text-sub);
    background: white;
    padding: 8px;
    border-radius: var(--radius-base);
    border: 1px solid var(--border-color);
    margin-top: 8px;
    word-break: break-all;
    text-align: center;
}

/* ==========================================================================
   7. SVG COLOR PICKER TOOLS
   Strumenti specifici per la gestione delle palette colori SVG
   ========================================================================== */
.svg-preview {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
}
.text-preview {
    font-weight: 800;
    font-size: 1.5rem;
    line-height: 1;
}
.cta-preview {
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    height: 52px;
    padding: 0 24px;
    border-radius: var(--radius-preview-btn);
    border: 1px solid transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.color-row {
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: flex-start;
    margin: 16px 0;
    min-height: 85px;
}
.color-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 70px;
    position: relative;
}
/* Hack per input color picker nascosto ma cliccabile */
.color-dot {
    width: 42px;
    height: 42px;
    border-radius: var(--radius-base);
    border: 1px solid #ccc;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s;
}
.color-dot:hover {
    transform: scale(1.1);
    border-color: var(--primary);
    z-index: 2;
}
.color-dot input[type="color"] {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    cursor: pointer;
    opacity: 0;
}
.hex-input {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: var(--radius-base);
    font-size: 0.75rem;
    font-family: "Consolas", monospace;
    text-align: center;
    text-transform: uppercase;
    color: var(--text-main);
    padding: 6px 0;
    background: white;
}
.hex-input:focus {
    outline: 2px solid var(--primary);
    border-color: var(--primary);
}
.slot-placeholder {
    width: 42px;
    height: 42px;
    border-radius: var(--radius-base);
    border: 1px dashed #999;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    cursor: pointer;
    background: #f4f4f4;
    transition: all 0.2s;
}
.slot-placeholder:hover {
    border-color: var(--primary);
    color: var(--primary);
    background: white;
}
.slot-label {
    font-size: 0.65rem;
    font-weight: 700;
    color: #999;
    text-transform: uppercase;
    height: 24px;
    display: flex;
    align-items: center;
}
.btn-remove-slot {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 16px;
    height: 16px;
    background: var(--accent);
    color: white;
    border-radius: var(--radius-base);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    z-index: 5;
}
.btn-remove-slot:hover {
    background: black;
    transform: scale(1.1);
}
.btn-fix-floating {
    position: absolute;
    bottom: 16px;
    right: 16px;
    background: var(--accent);
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: var(--radius-base);
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 6px;
    z-index: 10;
    cursor: pointer;
    text-transform: uppercase;
}
.btn-fix-floating:hover {
    transform: translate(-1px, -1px);
    box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.2);
    background: #d00000;

/* PSD Export Toggle Row */
.psd-toggle-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
    min-height: 32px;
    position: relative;
}
.psd-toggle-row .form-check-label {
    font-size: 11px !important;
    letter-spacing: 0.6px;
}
.psd-toggle-row .form-check-input {
    width: 2.8em;
    height: 1.4em;
}
#psdStatus {
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    margin-top: 4px;
    white-space: nowrap;
}

/* ==========================================================================
   8. MODAL EDITOR (CropperJS Integration)
   ========================================================================== */
.modal-content {
    border-radius: var(--radius-base);
    border: 1px solid var(--primary);
    overflow: hidden;
    box-shadow: 20px 20px 0 rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
}
.modal-header {
    padding: 16px 24px;
    border-bottom: 1px solid #ccc;
    background: white;
    position: relative;
    z-index: 1060;
}
.modal-body {
    padding: 0;
    background: #222; /* Sfondo scuro per contrasto con immagine */
    height: 70vh;
    min-height: 500px;
    position: relative;
    overflow: hidden;
}
.modal-footer {
    padding: 16px 24px;
    border-top: 1px solid #ccc;
    background: white;
    position: relative;
    z-index: 1060;
}
.modal-footer #modalCircleGroup.form-check {
    margin: 0 1rem;
    align-self: center;
}
.img-container {
    width: 100%;
    height: 100%;
    display: block;
}
.img-container img {
    display: block;
    max-width: 100%;
}
/* Override CropperJS Default Styles */
.cropper-view-box {
    outline: 1px solid #ffffff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
    background-color: transparent;
}
.cropper-modal {
    opacity: 0.85;
    background-color: #111;
}
.cropper-point {
    background-color: var(--accent);
    width: 8px;
    height: 8px;
    opacity: 1;
    border-radius: var(--radius-base);
}

/* Soppressione griglia e center dot del cropper */
.cropper-dashed,
.cropper-center {
    display: none !important;
}

/* --------------------------------------------------------------------------
   OVERLAY ZONES — Area Focus (f) + Overlay Zones (oz)
   --------------------------------------------------------------------------
   Palette colori:
   - Area Focus  → Verde  #22C55E — bordo solido 2px  — dove METTERE il soggetto
   - Area Testi  → Ambra  #F59E0B — bordo dashed 2px  — testo/gradient UI (evitare)
   - Area Loghi  → Rosso  #EF4444 — bordo dashed 2px  — loghi/premi (evitare)

   NOTA: Gli stili critici degli overlay sono anche inline nel JS (updateOverlay),
   quindi il rendering funziona anche senza questo CSS. Questo file serve come
   override/fallback e per gli hint della legenda nel footer del modal.
   -------------------------------------------------------------------------- */

/* --- Area Focus (f) — Verde --- */
.modal-focus-overlay {
    position: absolute;
    pointer-events: none;
    z-index: 50;
    border: 2px solid rgba(34, 197, 94, 0.85);
    background: rgba(34, 197, 94, 0.08);
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 4px;
}

/* --- Overlay Zones (oz) — base --- */
.modal-oz-overlay {
    position: absolute;
    pointer-events: none;
    z-index: 49;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 4px;
    box-sizing: border-box;
}

/* Tipo "text": Area Testi — Ambra */
.modal-oz-text {
    border: 2px dashed rgba(245, 158, 11, 0.90);
    background: rgba(245, 158, 11, 0.15);
}

/* Tipo "badge": Area Loghi — Rosso */
.modal-oz-badge {
    border: 2px dashed rgba(239, 68, 68, 0.90);
    background: rgba(239, 68, 68, 0.15);
}

/* Label interne alle zone */
.modal-oz-label,
.modal-focus-overlay > span {
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #fff;
    white-space: nowrap;
    padding: 2px 6px;
    border-radius: 3px;
    line-height: 1;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}
.modal-focus-overlay > span {
    background: rgba(34, 197, 94, 0.55);
}
.modal-oz-text .modal-oz-label {
    background: rgba(245, 158, 11, 0.65);
}
.modal-oz-badge .modal-oz-label {
    background: rgba(239, 68, 68, 0.65);
}

/* Guide personalizzate per cerchi */
.circle-guide-overlay {
    position: absolute;
    inset: 0;
    border: 1px dashed var(--guide-color);
    border-radius: 50%;
    box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.7); /* Hack per oscurare l'esterno del cerchio */
    pointer-events: none;
    z-index: 51;
}

/* Hint legenda (footer modale) */
.hint-square {
    width: 12px;
    height: 12px;
    border: 2px solid rgba(34, 197, 94, 0.85);
    background: rgba(34, 197, 94, 0.15);
    display: inline-block;
    margin-right: 2px;
    border-radius: 2px;
}
.hint-oz-text {
    width: 12px;
    height: 12px;
    border: 2px dashed rgba(245, 158, 11, 0.90);
    background: rgba(245, 158, 11, 0.18);
    display: inline-block;
    margin-right: 2px;
    border-radius: 2px;
}
.hint-oz-badge {
    width: 12px;
    height: 12px;
    border: 2px dashed rgba(239, 68, 68, 0.90);
    background: rgba(239, 68, 68, 0.18);
    display: inline-block;
    margin-right: 2px;
    border-radius: 2px;
}
.magenta-dot {
    width: 12px;
    height: 12px;
    background-color: var(--guide-color);
    border: 1px solid #008c9e;
    border-radius: 50%;
    display: inline-block;
}

/* Custom Switch con iconografia SVG in CSS */
.custom-switch-layout {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 !important;
    margin: 0 !important;
}
.custom-switch-layout .form-check-input {
    margin-left: 0 !important;
    cursor: pointer;
    width: 3.5em;
    height: 1.75em;
    border-radius: 0 !important;
    background-color: #e0e0e0;
    border: 1px solid #666;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3crect x='-2' y='-2' width='4' height='4' fill='%23666'/%3e%3c/svg%3e");
}
.custom-switch-layout .form-check-input:checked {
    background-color: var(--primary);
    border-color: var(--primary);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3crect x='-2' y='-2' width='4' height='4' fill='%23fff'/%3e%3c/svg%3e");
}
.custom-switch-layout .form-check-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

/* ==========================================================================
   9. UTILITIES & RESPONSIVE
   ========================================================================== */
#loadingOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.98);
    z-index: 9999;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#safariAlert {
    display: none;
    background: #1a1a1a;
    color: white;
    padding: 12px;
    text-align: center;
    font-weight: 600;
    border-bottom: 1px solid #333;
    font-size: 0.85rem;
    font-family: monospace;
}

/* Form Slider customization */
.form-range::-webkit-slider-thumb {
    background: var(--primary);
}
.form-range::-webkit-slider-thumb:active {
    background: var(--accent);
}

#modalZoomGroup .icon {
    user-select: none;
    transition: color 0.2s;
}
#modalZoomGroup .icon:hover {
    color: var(--primary) !important;
}
.border-start {
    border-left: 1px solid #ccc !important;
}

/* RESPONSIVE QUERIES */
@media (min-width: 768px) {
    .container-grid {
        padding-right: 40px;
        padding-left: 40px;
        max-width: 100%;
    }
}
@media (min-width: 992px) {
    .row.g-4 {
        --bs-gutter-x: 40px;
        --bs-gutter-y: 40px;
    }
}
@media (max-width: 768px) {
    .modal-header,
    .modal-footer {
        padding: 10px 16px !important;
    }
    .modal-body {
        height: 65vh !important;
        min-height: auto !important;
        max-height: none !important;
    }
    .d-flex.flex-column.flex-md-row > div {
        width: 100%;
    }
    .modal-footer .btn {
        padding: 12px 0;
    }
}

/* ==========================================================================
   10. DETECT MODAL (Smart Asset Recognition)
   Modale custom per conferma auto-riconoscimento asset.
   Stile brutalist coerente con il design system Katana.
   ========================================================================== */
.detect-overlay {
    position: fixed;
    inset: 0;
    z-index: 2000;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: detectFadeIn 0.2s ease;
}
@keyframes detectFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
}
@keyframes detectSlideIn {
    from { opacity: 0; transform: translateY(12px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
}
.detect-dialog {
    background: var(--surface, #ffffff);
    border: 2px solid var(--primary, #1a1a1a);
    box-shadow: 12px 12px 0 rgba(0, 0, 0, 0.12);
    width: 420px;
    max-width: calc(100vw - 32px);
    animation: detectSlideIn 0.25s ease;
    font-family: "Inter", sans-serif;
}
.detect-header {
    padding: 20px 24px 16px;
    border-bottom: 1px solid var(--border-color, #e0e0e0);
    display: flex;
    align-items: center;
    gap: 10px;
}
.detect-header .icon {
    font-size: 22px;
    color: var(--accent, #e63946);
}
.detect-header h5 {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--text-main, #111);
}
.detect-body {
    padding: 20px 24px;
}
.detect-row {
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding: 6px 0;
}
.detect-row:not(:last-child) {
    border-bottom: 1px dashed var(--border-color, #e0e0e0);
}
.detect-label {
    flex-shrink: 0;
    width: 100px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-muted, #888);
}
.detect-value {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-main, #111);
    word-break: break-word;
}
.detect-value .detect-pill {
    display: inline-block;
    background: var(--primary, #1a1a1a);
    color: #fff;
    padding: 2px 8px;
    font-size: 0.7rem;
    font-weight: 700;
    font-family: monospace;
    letter-spacing: 0.5px;
    margin-left: 6px;
    vertical-align: middle;
}
.detect-footer {
    padding: 16px 24px 20px;
    border-top: 1px solid var(--border-color, #e0e0e0);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
}
.detect-footer .detect-hint {
    flex: 1;
    font-size: 0.72rem;
    color: var(--text-muted, #888);
    line-height: 1.4;
}
.detect-btn {
    padding: 10px 24px;
    font-weight: 700;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease;
    font-family: "Inter", sans-serif;
}
.detect-btn-cancel {
    background: #f0f0f0;
    color: var(--text-main, #111);
    border: 1px solid transparent;
}
.detect-btn-cancel:hover {
    background: #e0e0e0;
    color: #000;
}
.detect-btn-confirm {
    background: var(--accent, #e63946);
    color: #fff;
}
.detect-btn-confirm:hover {
    background: #000;
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}`,Ir=`<!doctype html>
<html lang="it">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
            http-equiv="Content-Security-Policy"
            content="
            default-src 'self';
            script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;
            font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com;
            img-src 'self' data: blob:;
            connect-src 'self';
        " />

        <title data-i18n="appTitle">KATANA</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap"
            rel="stylesheet" />
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
            crossorigin="anonymous" />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css"
            integrity="sha384-oMy41mb/qJnpJlpXOF57hSu2KGi47l/UV9+tPNrBOs7/ap5Vubj/3phrCtjutHMQ"
            crossorigin="anonymous" />
        <link rel="stylesheet" href="style.css" />
    </head>
    <body>
        <div id="loadingOverlay">
            <div
                class="spinner-border text-dark mb-3"
                style="width: 3rem; height: 3rem; border-width: 4px"
                role="status"></div>
            <h5 class="fw-bold text-uppercase" style="letter-spacing: 2px" data-i18n="processing"></h5>
            <p class="text-muted small font-monospace" id="loaderText" data-i18n="assetAnalysis"></p>
        </div>

        <div id="safariAlert" data-i18n="safariAlert">
            <span class="icon icon-fill me-2">warning</span>
        </div>

        <nav class="navbar navbar-custom sticky-top">
            <div class="container-grid">
                <div class="row w-100 mx-0">
                    <div class="col-12 d-flex justify-content-between align-items-center px-0">
                        <a href="#" onclick="location.reload()" class="brand-logo">
                            <svg
                                class="icon"
                                width="32"
                                height="32"
                                viewBox="0 0 100 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style="width: 32px; height: 32px; flex-shrink: 0">
                                <rect x="5" y="5" width="30" height="10" fill="currentColor" />
                                <rect x="5" y="5" width="10" height="30" fill="currentColor" />
                                <rect x="65" y="85" width="30" height="10" fill="currentColor" />
                                <rect x="85" y="65" width="10" height="30" fill="currentColor" />
                                <path d="M15 85 L85 15" stroke="currentColor" stroke-width="8" />
                                <path d="M15 85 L45 55" stroke="currentColor" stroke-width="8" />
                                <path d="M85 15 L55 45" stroke="currentColor" stroke-width="8" />
                            </svg>
                            <span>KATANA</span>
                        </a>
                        <span class="version-pill" id="versionTag"></span>
                    </div>
                </div>
            </div>
        </nav>

        <div class="container-grid">
            <div id="step1">
                <div class="row justify-content-center w-100 mx-0">
                    <div class="col-12 col-xl-8 px-0">
                        <div class="config-card">
                            <div class="d-flex align-items-center gap-3 mb-4">
                                <div
                                    class="bg-black text-white d-flex align-items-center justify-content-center"
                                    style="width: 40px; height: 40px; border-radius: 0">
                                    <span class="icon">add</span>
                                </div>
                                <h4
                                    class="fw-bold m-0 text-on-grid"
                                    style="margin-bottom: 0 !important"
                                    data-i18n="newProject"></h4>
                            </div>

                            <div class="row g-4">
                                <div class="col-md-12">
                                    <label class="input-label-sm" data-i18n="site"></label>
                                    <div class="input-group-custom">
                                        <span class="icon input-icon">public</span>
                                        <select id="siteSelector" class="form-select" style="cursor: pointer"></select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label class="input-label-sm" data-i18n="projectName"></label>
                                    <div class="input-group-custom">
                                        <span class="icon input-icon">description</span>
                                        <input
                                            type="text"
                                            id="fileDesc"
                                            class="form-control"
                                            placeholder="ES. PROMO-NATALE"
                                            data-i18n-placeholder="exampleSlug" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="input-label-sm" data-i18n="uiComponent"></label>
                                    <div class="input-group-custom">
                                        <span class="icon input-icon">view_quilt</span>
                                        <select id="componentType" class="form-select"></select>
                                    </div>
                                </div>
                                <div class="col-md-6" id="variantSelectContainer" style="opacity: 0.5">
                                    <label class="input-label-sm" data-i18n="variant"></label>
                                    <div class="input-group-custom">
                                        <span class="icon input-icon">layers</span>
                                        <select id="variantSelector" class="form-select" disabled>
                                            <option value="main" selected disabled data-i18n="noVariant"></option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-4">
                                <label class="input-label-sm mb-2" data-i18n="expectedAssets"></label>
                                <div id="specsContainer" class="d-flex flex-wrap gap-2"></div>
                            </div>
                        </div>

                        <div class="drop-zone" id="dropZone">
                            <div class="drop-icon-wrapper"><span class="icon">add_photo_alternate</span></div>
                            <h5
                                class="fw-bold text-uppercase"
                                style="letter-spacing: 1px"
                                data-i18n="uploadMaster"></h5>
                            <p class="text-muted small mb-0 font-monospace" data-i18n="dragOrClick"></p>
                            <input type="file" id="fileInput" accept="image/*,.psd" hidden />
                        </div>
                    </div>
                </div>
            </div>

            <div id="step2" class="d-none">
                <div class="row w-100 mx-0">
                    <div class="col-12 px-0">
                        <div
                            class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
                            <div class="w-100">
                                <h4
                                    class="fw-bold m-0 text-break text-on-grid"
                                    id="workspaceTitle"
                                    data-i18n="workspaceTitle"></h4>
                                <p class="text-muted small m-0 font-monospace" data-i18n="reviewCuts"></p>
                            </div>
                            <button
                                onclick="window.resetApp()"
                                class="btn-ghost text-nowrap align-self-end align-self-md-center">
                                <span class="icon icon-sm">refresh</span> <span data-i18n="newButton"></span>
                            </button>
                        </div>

                        <div class="row g-4" id="previewGrid"></div>

                        <div class="text-center mt-5 pb-5">
                            <button id="processBtn" class="btn-pill-primary shadow-lg">
                                <span class="icon">folder_zip</span> <span data-i18n="downloadPackage"></span>
                            </button>
                            <div class="psd-toggle-row mt-3">
                                <div class="custom-switch-layout form-check form-switch m-0">
                                    <input class="form-check-input" type="checkbox" role="switch" id="psdToggle" />
                                    <label class="form-check-label small fw-bold text-muted text-uppercase" for="psdToggle" style="cursor:pointer;letter-spacing:0.5px" data-i18n="psdToggleLabel"></label>
                                </div>
                                <span id="psdStatus" class="small font-monospace" style="display:none"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <input type="file" id="replaceInput" accept="image/*,.psd" hidden />

            <div class="modal fade" id="editorModal" tabindex="-1" data-bs-backdrop="static">
                <div class="modal-dialog modal-xl modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title fw-bold d-flex align-items-center gap-2 text-uppercase">
                                <span class="icon text-dark">crop</span> <span data-i18n="editCrop"></span>
                            </h5>
                            <button type="button" class="btn-close" onclick="window.closeModal()"></button>
                        </div>
                        <div class="modal-body">
                            <div class="img-container"><img id="editorImage" src="" alt="Editing Canvas" /></div>
                        </div>
                        <div class="modal-footer justify-content-between flex-wrap gap-2 p-2 p-md-3">
                            <div class="d-flex align-items-center gap-3 me-auto">
                                <div class="d-none d-md-flex align-items-center gap-2">
                                    <span id="modalHintSquare" class="hint-square"></span>
                                    <span id="modalOzTextHint" class="hint-oz-text" style="display:none"></span>
                                    <span id="modalOzBadgeHint" class="hint-oz-badge" style="display:none"></span>
                                    <span
                                        id="modalHintText"
                                        class="small fw-bold text-muted"
                                        data-i18n="modalHintGeneral"></span>
                                </div>
                                <div id="modalCircleGroup" class="d-none border-start ps-4 ms-3">
                                    <div class="custom-switch-layout form-check form-switch">
                                        <span class="magenta-dot"></span>
                                        <label
                                            class="form-check-label small fw-bold text-muted m-0"
                                            for="circleMaskToggle"
                                            style="cursor: pointer"
                                            data-i18n="circleMaskToggle"
                                            >Maschera Circolare</label
                                        >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="circleMaskToggle" />
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-4">
                                <div id="modalRangeGroup" class="d-none align-items-center gap-2">
                                    <span
                                        class="small fw-bold text-muted text-uppercase"
                                        id="modalRangeLabel"
                                        data-i18n="width"></span>
                                    <input type="range" class="form-range" id="modalWidthSlider" style="width: 100px" />
                                    <span
                                        id="modalWidthVal"
                                        class="badge bg-light text-dark border rounded-0"
                                        style="min-width: 60px"></span>
                                </div>
                                <div
                                    id="modalZoomGroup"
                                    class="d-none d-md-flex align-items-center gap-2 border-start ps-4">
                                    <span class="small fw-bold text-muted text-uppercase me-2" data-i18n="zoom"
                                        >Zoom</span
                                    >
                                    <span
                                        class="icon text-muted"
                                        style="font-size: 20px; cursor: pointer"
                                        onclick="window.stepZoom(-0.1)"
                                        >remove</span
                                    >
                                    <input
                                        type="range"
                                        class="form-range"
                                        id="modalZoomSlider"
                                        min="0.1"
                                        max="3.0"
                                        step="0.05"
                                        style="width: 100px"
                                        title="Zoom" />
                                    <span
                                        class="icon text-muted"
                                        style="font-size: 20px; cursor: pointer"
                                        onclick="window.stepZoom(0.1)"
                                        >add</span
                                    >
                                </div>
                            </div>
                            <div class="d-flex gap-2 w-100 w-md-auto justify-content-end mt-2 mt-md-0">
                                <button
                                    class="btn btn-light border rounded-0 px-4 fw-bold text-uppercase flex-fill flex-md-grow-0"
                                    onclick="window.closeModal()"
                                    data-i18n="cancel"></button>
                                <button
                                    class="btn btn-primary rounded-0 px-4 fw-bold text-uppercase flex-fill flex-md-grow-0"
                                    id="saveCropBtn"
                                    style="background: var(--primary); border: none"
                                    data-i18n="apply"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script
            src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
            integrity="sha384-+mbV2IY1Zk/X1p/nWllGySJSUN8uMs+gUAN10Or95UBH0fpj6GfKgPmgC5EXieXG"
            crossorigin="anonymous"><\/script>
        <script
            src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"
            integrity="sha384-PlRSzpewlarQuj5alIadXwjNUX+2eNMKwr0f07ShWYLy8B6TjEbm7ZlcN/ScSbwy"
            crossorigin="anonymous"><\/script>
        <script
            src="https://cdnjs.cloudflare.com/ajax/libs/smartcrop/2.0.3/smartcrop.js"
            crossorigin="anonymous"
            integrity="sha384-btwK6asQkKFyuVLL7tlu27+wKFMicCOu0Vv1eZDVx3W1SeftViI9/EW0w3ihm8rF"><\/script>
        <script
            src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"
            crossorigin="anonymous"
            integrity="sha384-r+ljwOAhwY4/kdyzMnuBg7MEVoWpTMp5EYUDntB/E9qzNwL9dAEcNrb2XaV+mJc2"><\/script>
        <script
            src="https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.2/tinycolor.min.js"
            crossorigin="anonymous"
            integrity="sha384-AZ8EPX4FWLU/SIr5Xfoem6KYnSN7QhmrnEZIzF2NjoDoX9PV9GMuA0XCI3jndPym"><\/script>
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
            crossorigin="anonymous"
            integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"><\/script>

        <script src="data.js"><\/script>
        <script src="script.js?v=stable"><\/script>
    </body>
</html>`;function Cf({text:c,label:x}){const[p,T]=ne.useState(!1),z=async()=>{try{await navigator.clipboard.writeText(c)}catch{const C=document.createElement("textarea");C.value=c,document.body.appendChild(C),C.select(),document.execCommand("copy"),document.body.removeChild(C)}T(!0),setTimeout(()=>T(!1),2e3)};return i.jsxs("button",{onClick:z,className:`inline-flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all ${p?"bg-emerald-50 border-emerald-300 text-emerald-700":"bg-white border-slate-200 text-slate-600 hover:border-slate-400"}`,style:{fontSize:"11px"},children:[p?i.jsx(qi,{className:"w-3 h-3"}):i.jsx(Yi,{className:"w-3 h-3"}),p?"Copiato!":x||"Copia intero file"]})}function kf({file:c}){const[x,p]=ne.useState(!1),T=c.code.split(`
`).length,z=(new TextEncoder().encode(c.code).length/1024).toFixed(1);return i.jsxs("div",{className:"border border-slate-200 rounded-lg overflow-hidden",children:[i.jsxs("div",{className:"flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200",children:[i.jsxs("div",{className:"flex items-center gap-2.5",children:[i.jsx(ud,{className:"w-4 h-4 text-slate-500"}),i.jsx("span",{className:"text-slate-800",style:{fontSize:"14px",fontFamily:"monospace"},children:c.filename}),i.jsx("span",{className:"px-2 py-0.5 rounded border bg-blue-100 text-blue-700 border-blue-200",style:{fontSize:"10px"},children:"FILE COMPLETO"}),i.jsxs("span",{className:"text-slate-400",style:{fontSize:"11px"},children:[T," righe · ",z," KB"]})]}),i.jsx("div",{className:"flex items-center gap-2",children:i.jsx(Cf,{text:c.code})})]}),i.jsx("div",{className:"px-4 py-2 bg-slate-50 border-b border-slate-100",children:i.jsx("p",{className:"text-slate-600",style:{fontSize:"12px",lineHeight:"1.5"},children:c.description})}),i.jsxs("div",{className:"flex items-center gap-2 px-4 py-2 bg-slate-800 cursor-pointer hover:bg-slate-700 transition-colors",onClick:()=>p(!x),children:[x?i.jsx(Ul,{className:"w-3.5 h-3.5 text-slate-400"}):i.jsx(Gl,{className:"w-3.5 h-3.5 text-slate-400"}),i.jsx("span",{className:"text-slate-400",style:{fontSize:"11px"},children:x?"Nascondi codice":"Mostra codice"})]}),x&&i.jsx("pre",{className:"p-4 bg-slate-900 text-slate-200 overflow-auto max-h-[600px]",style:{fontSize:"11.5px",lineHeight:"1.55",fontFamily:"'SF Mono', 'Fira Code', 'Consolas', monospace"},children:c.code})]})}const Gi=[{filename:"data.js",description:"v3.0: STRINGS aggiornate con chiavi smart detection (detectTitle, detectChannel, detectComponent, detectVariant, detectSlug, detectConfirm, detectBtnConfirm, detectBtnCancel, detectFileName). Versione bumped a v3.0 Stable. SITE_CONFIG invariato.",code:Tr},{filename:"script.js",description:"v3.0: Smart asset detection — detectAssetFromFile() analizza nome file, dimensioni, layer PSD. showDetectModal() crea modale custom brutalist con conferma/ignora (no confirm() nativo). applyDetectedMatch() switcha selettori UI + slug. loadMaster() flow asincrono: attende scelta utente prima di runSmartCrop. fileToDataUrl() memorizza layer PSD.",code:zr},{filename:"style.css",description:"v3.0: Sezione 10 — Detect Modal con animazioni (fadeIn/slideIn), layout righe label/value, bottoni brutalist (accent/ghost). #psdStatus position:absolute. Fix } mancante su .btn-fix-floating:hover.",code:Er},{filename:"index.html",description:"Invariato rispetto a v2.0. HTML originale con file input accept PSD, toggle PSD con custom-switch-layout, hint-oz nel modal footer.",code:Ir}];function Nf(){return i.jsxs("div",{className:"space-y-6",children:[i.jsxs("div",{className:"bg-white border border-slate-200 rounded-lg p-5",children:[i.jsxs("div",{className:"flex items-start justify-between gap-4",children:[i.jsxs("div",{children:[i.jsx("h2",{style:{fontSize:"18px"},className:"text-slate-900 mb-2",children:"Codice Katana aggiornato"}),i.jsxs("p",{className:"text-slate-600",style:{fontSize:"13px",lineHeight:"1.7"},children:["4 file completi pronti per il copy-paste su Notion. Ogni file va copiato e incollato"," ",i.jsx("strong",{children:"al posto dell'intero contenuto"})," ","della sotto-pagina corrispondente nel Progetto Katana."]})]}),i.jsx("div",{className:"flex-shrink-0",children:i.jsx(Mn,{className:"w-5 h-5 text-slate-400"})})]}),i.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4",children:Gi.map(c=>i.jsxs("div",{className:"rounded-md p-3 border text-center bg-blue-50 border-blue-200",children:[i.jsx("div",{className:"text-slate-800",style:{fontSize:"13px",fontFamily:"monospace"},children:c.filename}),i.jsx("div",{className:"text-blue-600",style:{fontSize:"10px"},children:"Sostituire intero"})]},c.filename))})]}),i.jsxs("div",{className:"bg-slate-50 border border-slate-200 rounded-lg p-4",children:[i.jsx("h3",{className:"text-slate-800 mb-2",style:{fontSize:"13px"},children:"Convenzione colori overlay (crop modal)"}),i.jsxs("div",{className:"flex flex-wrap gap-4",style:{fontSize:"12px"},children:[i.jsxs("span",{className:"inline-flex items-center gap-1.5 text-slate-700",children:[i.jsx("span",{className:"w-3 h-3 rounded-sm border-2",style:{borderColor:"rgba(34, 197, 94, 0.85)",background:"rgba(34, 197, 94, 0.15)"}}),i.jsx("code",{children:"f"})," = ",i.jsx("strong",{children:"Area Focus"})," (verde, solido)"]}),i.jsxs("span",{className:"inline-flex items-center gap-1.5 text-slate-700",children:[i.jsx("span",{className:"w-3 h-3 rounded-sm border",style:{borderStyle:"dashed",borderWidth:"2px",borderColor:"rgba(245, 158, 11, 0.90)",background:"rgba(245, 158, 11, 0.18)"}}),i.jsx("code",{children:"oz text"})," = ",i.jsx("strong",{children:"Area Testi"})," ","(ambra, dashed)"]}),i.jsxs("span",{className:"inline-flex items-center gap-1.5 text-slate-700",children:[i.jsx("span",{className:"w-3 h-3 rounded-sm border",style:{borderStyle:"dashed",borderWidth:"2px",borderColor:"rgba(239, 68, 68, 0.90)",background:"rgba(239, 68, 68, 0.18)"}}),i.jsx("code",{children:"oz badge"})," = ",i.jsx("strong",{children:"Area Loghi"})," ","(rosso, dashed)"]})]})]}),i.jsxs("div",{children:[i.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[i.jsx("div",{className:"w-2 h-2 rounded-full bg-blue-500"}),i.jsxs("h3",{style:{fontSize:"14px"},className:"text-slate-800",children:["File da sostituire integralmente (",Gi.length,")"]}),i.jsx("div",{className:"flex-1 h-px bg-slate-200"})]}),i.jsx("div",{className:"space-y-4",children:Gi.map(c=>i.jsx(kf,{file:c},c.filename))})]})]})}function jf(){let c=Ir;const x=c.indexOf("Content-Security-Policy");if(x!==-1){const C=c.lastIndexOf("<meta",x),F=c.indexOf("/>",x);C!==-1&&F!==-1&&(c=c.substring(0,C)+"<!-- CSP removed -->"+c.substring(F+2))}c=c.replace(/\s+integrity="[^"]*"/g,"");const p=c.indexOf('href="style.css"');if(p!==-1){const C=c.lastIndexOf("<link",p),F=c.indexOf(">",p)+1;C!==-1&&F>0&&(c=c.substring(0,C)+`<style>
`+Er+`
</style>`+c.substring(F))}const T=c.indexOf('src="data.js"');if(T!==-1){const C=c.lastIndexOf("<script",T),F="<\/script>",H=c.indexOf(F,T);C!==-1&&H!==-1&&(c=c.substring(0,C)+`<script>
`+Tr+`
<\/script>`+c.substring(H+F.length))}const z=c.indexOf('src="script.js');if(z!==-1){const C=c.lastIndexOf("<script",z),F="<\/script>",H=c.indexOf(F,z);C!==-1&&H!==-1&&(c=c.substring(0,C)+`<script>
`+zr+`
<\/script>`+c.substring(H+F.length))}return c}const Tf=["<script>","(function(){","  var oL=console.log,oW=console.warn,oE=console.error,oI=console.info;","  function s(t,a){","    var x=[].slice.call(a).map(function(v){","      try{return typeof v==='object'?JSON.stringify(v,null,2):String(v)}","      catch(e){return String(v)}","    }).join(' ');","    window.parent.postMessage({__kc:1,t:t,x:x},'*');","  }","  console.log=function(){s('log',arguments);oL.apply(console,arguments)};","  console.warn=function(){s('warn',arguments);oW.apply(console,arguments)};","  console.error=function(){s('error',arguments);oE.apply(console,arguments)};","  console.info=function(){s('info',arguments);oI.apply(console,arguments)};","  window.onerror=function(m,u,l,c){s('error',['[JS] '+m+' L'+l+':'+c])};","  window.addEventListener('unhandledrejection',function(e){","    s('error',['[Promise] '+(e.reason&&e.reason.message||String(e.reason))]);","  });","})();","<\/script>"].join(`
`);function zf(){const c=ne.useRef(null),[x,p]=ne.useState(!1),[T,z]=ne.useState([]),[C,F]=ne.useState(!1),[H,K]=ne.useState(0),re=ne.useMemo(()=>{let P=jf();return P=P.replace("<body>",`<body>
`+Tf),P},[]),ae=ne.useCallback(P=>{if(P.data&&P.data.__kc){const Ie=new Date,Ze=String(Ie.getHours()).padStart(2,"0")+":"+String(Ie.getMinutes()).padStart(2,"0")+":"+String(Ie.getSeconds()).padStart(2,"0");z(Ve=>[...Ve.slice(-300),{type:P.data.t,text:P.data.x,ts:Ze}])}},[]);ne.useEffect(()=>(window.addEventListener("message",ae),()=>window.removeEventListener("message",ae)),[ae]);const Y=()=>{z([]),K(P=>P+1)},L=()=>{const P=new Blob([re],{type:"text/html"});window.open(URL.createObjectURL(P),"_blank")},le=T.filter(P=>P.type==="error").length,xe=T.filter(P=>P.type==="warn").length,J={log:"text-slate-300",info:"text-blue-400",warn:"text-amber-400",error:"text-red-400"};return i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{className:"bg-white border border-slate-200 rounded-lg p-4",children:[i.jsx("h2",{className:"text-slate-900 mb-1",style:{fontSize:"18px"},children:"Katana — Live Preview"}),i.jsx("p",{className:"text-slate-500",style:{fontSize:"12px",lineHeight:"1.6"},children:"Esecuzione live dei 4 file generati (data.js + script.js + style.css + index.html) combinati in un unico documento. Carica un'immagine per testare il crop con gli overlay. Apri la Console per vedere errori e log."})]}),i.jsxs("div",{className:"flex items-center justify-between bg-slate-800 rounded-t-lg px-4 py-2 border border-slate-700 border-b-0",children:[i.jsxs("div",{className:"flex items-center gap-3",children:[i.jsxs("div",{className:"flex items-center gap-1.5",children:[i.jsx("div",{className:"w-3 h-3 rounded-full bg-red-500/80"}),i.jsx("div",{className:"w-3 h-3 rounded-full bg-amber-400/80"}),i.jsx("div",{className:"w-3 h-3 rounded-full bg-green-500/80"})]}),i.jsx("span",{className:"text-slate-400",style:{fontSize:"12px",fontFamily:"monospace"},children:"katana-preview.html"})]}),i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsxs("button",{onClick:()=>F(P=>!P),className:`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border transition-all ${C?"bg-slate-700 text-slate-200 border-slate-600":"bg-transparent text-slate-400 border-slate-700 hover:text-slate-300"}`,style:{fontSize:"11px"},children:[i.jsx(Ap,{className:"w-3 h-3"}),"Console",le>0&&i.jsx("span",{className:"bg-red-500 text-white rounded-full px-1.5",style:{fontSize:"9px"},children:le}),xe>0&&le===0&&i.jsx("span",{className:"bg-amber-500 text-white rounded-full px-1.5",style:{fontSize:"9px"},children:xe})]}),i.jsx("button",{onClick:Y,className:"p-1.5 rounded-md bg-transparent text-slate-400 border border-slate-700 hover:text-slate-200 transition-colors",title:"Ricarica",children:i.jsx(uf,{className:"w-3.5 h-3.5"})}),i.jsx("button",{onClick:()=>p(P=>!P),className:"p-1.5 rounded-md bg-transparent text-slate-400 border border-slate-700 hover:text-slate-200 transition-colors",title:x?"Esci da fullscreen":"Fullscreen",children:x?i.jsx(of,{className:"w-3.5 h-3.5"}):i.jsx(rf,{className:"w-3.5 h-3.5"})}),i.jsx("button",{onClick:L,className:"p-1.5 rounded-md bg-transparent text-slate-400 border border-slate-700 hover:text-slate-200 transition-colors",title:"Apri in nuovo tab",children:i.jsx(Op,{className:"w-3.5 h-3.5"})})]})]}),i.jsx("div",{className:`bg-slate-900 border border-slate-700 overflow-hidden transition-all ${x?"fixed inset-0 z-50 rounded-none":"rounded-b-lg"}`,style:{height:x?"100vh":700,marginTop:0},children:i.jsx("iframe",{ref:c,srcDoc:re,className:"w-full h-full border-0",sandbox:"allow-scripts allow-same-origin allow-modals allow-popups allow-forms",title:"Katana Live Preview"},H)}),C&&i.jsxs("div",{className:"bg-slate-900 border border-slate-700 rounded-lg overflow-hidden",children:[i.jsxs("div",{className:"flex items-center justify-between px-3 py-2 bg-slate-800 border-b border-slate-700",children:[i.jsxs("span",{className:"text-slate-400",style:{fontSize:"11px"},children:["Console (",T.length," messaggi)"]}),i.jsx("button",{onClick:()=>z([]),className:"text-slate-500 hover:text-slate-300 transition-colors",style:{fontSize:"10px"},children:"Pulisci"})]}),i.jsx("div",{className:"overflow-auto p-2 space-y-0.5",style:{maxHeight:250,fontSize:"11px",fontFamily:"'SF Mono','Fira Code',Consolas,monospace"},children:T.length===0?i.jsx("div",{className:"text-slate-600 py-4 text-center",style:{fontSize:"11px"},children:"Nessun messaggio"}):T.map((P,Ie)=>i.jsxs("div",{className:`px-2 py-0.5 rounded ${P.type==="error"?"bg-red-950/30":P.type==="warn"?"bg-amber-950/20":""}`,children:[i.jsx("span",{className:"text-slate-600 mr-2",children:P.ts}),i.jsxs("span",{className:J[P.type]||"text-slate-300",children:[P.type==="error"?"ERR ":P.type==="warn"?"WRN ":"",P.text]})]},Ie))})]}),i.jsxs("div",{className:"bg-slate-50 border border-slate-200 rounded-lg p-4",children:[i.jsx("h3",{className:"text-slate-800 mb-2",style:{fontSize:"13px"},children:"Come usare la preview"}),i.jsxs("div",{className:"space-y-1.5 text-slate-600",style:{fontSize:"12px",lineHeight:"1.6"},children:[i.jsxs("p",{children:[i.jsx("span",{className:"text-slate-400 mr-1",children:"1."}),"Seleziona ",i.jsx("strong",{children:"Canale"})," e"," ",i.jsx("strong",{children:"Componente"}),"."]}),i.jsxs("p",{children:[i.jsx("span",{className:"text-slate-400 mr-1",children:"2."}),i.jsx("strong",{children:"Trascina un'immagine"})," nella drop zone."]}),i.jsxs("p",{children:[i.jsx("span",{className:"text-slate-400 mr-1",children:"3."}),"Clicca ",i.jsx("strong",{children:'"Ritaglia"'})," su una card per il crop modal con overlay."]}),i.jsxs("p",{children:[i.jsx("span",{className:"text-slate-400 mr-1",children:"4."}),"Apri la ",i.jsx("strong",{children:"Console"})," per errori. Usa"," ",i.jsx("strong",{children:'"Apri in nuovo tab"'})," per test a schermo pieno."]})]})]})]})}function Wi({text:c,label:x}){const[p,T]=ne.useState(!1),z=async()=>{try{await navigator.clipboard.writeText(c)}catch{const C=document.createElement("textarea");C.value=c,document.body.appendChild(C),C.select(),document.execCommand("copy"),document.body.removeChild(C)}T(!0),setTimeout(()=>T(!1),2e3)};return i.jsxs("button",{onClick:z,className:`inline-flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all ${p?"bg-emerald-50 border-emerald-300 text-emerald-700":"bg-white border-slate-200 text-slate-600 hover:border-slate-400"}`,style:{fontSize:"11px"},children:[p?i.jsx(qi,{className:"w-3 h-3"}):i.jsx(Yi,{className:"w-3 h-3"}),p?"Copiato!":x||"Copia"]})}function Kl(c,x,p="text/plain"){const T=new Blob([x],{type:p}),z=URL.createObjectURL(T),C=document.createElement("a");C.href=z,C.download=c,document.body.appendChild(C),C.click(),document.body.removeChild(C),URL.revokeObjectURL(z)}function Ef(){[{name:"data.js",content:Tr,mime:"application/javascript"},{name:"script.js",content:zr,mime:"application/javascript"},{name:"style.css",content:Er,mime:"text/css"},{name:"index.html",content:Ir,mime:"text/html"}].forEach((x,p)=>{setTimeout(()=>Kl(x.name,x.content,x.mime),p*200)})}function fd({item:c,depth:x=0,defaultOpen:p=!0}){const[T,z]=ne.useState(p),C=c.type==="folder",F=x*20;return i.jsxs("div",{children:[i.jsxs("div",{className:`flex items-center gap-2 py-1.5 px-2 rounded-md transition-colors ${C?"hover:bg-slate-100 cursor-pointer":"hover:bg-slate-50"}`,style:{paddingLeft:F+8},onClick:()=>C&&z(!T),children:[C?T?i.jsx(Ul,{className:"w-3.5 h-3.5 text-slate-400 flex-shrink-0"}):i.jsx(Gl,{className:"w-3.5 h-3.5 text-slate-400 flex-shrink-0"}):i.jsx("span",{className:"w-3.5"}),C?i.jsx(Qp,{className:"w-4 h-4 text-amber-500 flex-shrink-0"}):i.jsx(ud,{className:"w-4 h-4 text-slate-400 flex-shrink-0"}),i.jsx("span",{className:`${C?"text-slate-800":"text-slate-600"}`,style:{fontSize:"13px",fontFamily:C?"inherit":"monospace"},children:c.name}),c.tag&&i.jsx("span",{className:`px-1.5 py-0.5 rounded border ${c.tagColor||"bg-slate-100 border-slate-200 text-slate-600"}`,style:{fontSize:"9px"},children:c.tag}),c.desc&&i.jsx("span",{className:"text-slate-400 ml-1",style:{fontSize:"11px"},children:c.desc})]}),C&&T&&c.children&&i.jsx("div",{children:c.children.map((H,K)=>i.jsx(fd,{item:H,depth:x+1,defaultOpen:x<1},K))})]})}const If={name:"katana/",type:"folder",tag:"ROOT",tagColor:"bg-violet-100 border-violet-200 text-violet-700",children:[{name:"dist/",type:"folder",tag:"OUTPUT",tagColor:"bg-emerald-100 border-emerald-200 text-emerald-700",desc:"File deployabili Katana",children:[{name:"data.js",type:"file",desc:"STRINGS + SITE_CONFIG"},{name:"script.js",type:"file",desc:"Logic, crop, detection, export"},{name:"style.css",type:"file",desc:"Design system brutalist"},{name:"index.html",type:"file",desc:"Markup + CDN dependencies"}]},{name:"tool/",type:"folder",tag:"DEV TOOL",tagColor:"bg-blue-100 border-blue-200 text-blue-700",desc:"React analysis app (Vite + Tailwind)",children:[{name:"src/",type:"folder",children:[{name:"app/",type:"folder",children:[{name:"App.tsx",type:"file",desc:"Entry point, tabs, stats"},{name:"components/",type:"folder",children:[{name:"analysis-data.ts",type:"file",desc:"Dati analisi Figma vs Config"},{name:"ComparisonCard.tsx",type:"file",desc:"Card confronto frame"},{name:"KatanaCodeTab.tsx",type:"file",desc:"Tab codice (4 file)"},{name:"KatanaPreviewTab.tsx",type:"file",desc:"Preview live iframe"},{name:"KatanaRepoTab.tsx",type:"file",desc:"Struttura repo (questo tab)"},{name:"katana-files/",type:"folder",tag:"SOURCE",tagColor:"bg-amber-100 border-amber-200 text-amber-700",desc:"Sorgente TS dei file output",children:[{name:"data-js-code.ts",type:"file"},{name:"script-js-code.ts",type:"file"},{name:"style-css-code.ts",type:"file"},{name:"index-html-code.ts",type:"file"}]}]}]},{name:"styles/",type:"folder",desc:"CSS del dev tool"}]},{name:"package.json",type:"file",desc:"Dipendenze dev tool"},{name:"vite.config.ts",type:"file"},{name:"tsconfig.json",type:"file"}]},{name:".gitignore",type:"file",desc:"node_modules, .DS_Store..."},{name:"README.md",type:"file",desc:"Docs progetto"}]},cd=`# 1. Struttura iniziale del repo
mkdir -p dist tool

# 2. Copia i 4 file output in dist/
cp data.js script.js style.css index.html dist/

# 3. Sposta il progetto React (dev tool) in tool/
mv src package.json vite.config.ts tsconfig.json postcss.config.mjs tool/

# 4. Commit separato per dist/ (output Katana)
git add dist/
git commit -m "feat(dist): Katana v3.0 — output files (data, script, style, html)"

# 5. Commit separato per tool/ (React dev tool)
git add tool/
git commit -m "feat(tool): Katana Frame Analyzer — React analysis app"

# 6. Push
git push origin main`,$i=`# Dependencies
node_modules/
.pnpm-store/

# Build output (dev tool)
tool/dist/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Env
.env
.env.local
.env.*.local`,Qi=`# Katana

Tool interno per il ritaglio e l'export di asset immagine per Poste.it Retail, Corporate e Social Media Kit.

## Struttura Repository

\`\`\`
katana/
├── dist/           ← File deployabili (copia su Notion / hosting)
│   ├── data.js     ← STRINGS + SITE_CONFIG
│   ├── script.js   ← Logic, crop, smart detection, export
│   ├── style.css   ← Design system brutalist
│   └── index.html  ← Markup + dipendenze CDN
│
├── tool/           ← Dev tool React (analisi Figma vs Config)
│   ├── src/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
\`\`\`

## dist/ — Katana App

I 4 file in \`dist/\` compongono l'applicazione Katana completa.
Per utilizzarla, apri \`index.html\` direttamente nel browser (funziona offline).

### Versione corrente: v3.0 Stable
- Smart Asset Detection (\`detectAssetFromFile()\`)
- Overlay Zones (oz) — Area Testi + Area Loghi
- Export PSD con layer (sorgente + overlay)
- Modale custom brutalist per conferma detection

## tool/ — Frame Analyzer

App React (Vite + Tailwind) per analizzare le misure dei frame Figma
rispetto alla SITE_CONFIG corporate.

### Avvio
\`\`\`bash
cd tool
pnpm install
pnpm dev
\`\`\`

### Tab disponibili
- **Analisi**: Confronto Figma vs Config con filtri e statistiche
- **Schema oz**: Documentazione proposta Overlay Zones
- **Preview**: Live preview dei 4 file combinati in iframe
- **JSON Corretto**: SITE_CONFIG aggiornata con correzioni
- **Codice Katana**: I 4 file pronti per copy-paste
- **Repository**: Struttura repo e export file
`,Af=[{name:"data.js",desc:"STRINGS (i18n) + SITE_CONFIG (3 canali, tutti i componenti)",icon:"📦",size:Tr.length,code:Tr,mime:"application/javascript"},{name:"script.js",desc:"Logic core: crop, detection, overlay, export ZIP/PSD",icon:"⚡",size:zr.length,code:zr,mime:"application/javascript"},{name:"style.css",desc:"Design system brutalist: tokens, card, modal, overlay zones",icon:"🎨",size:Er.length,code:Er,mime:"text/css"},{name:"index.html",desc:"Markup HTML + dipendenze CDN (Bootstrap, Cropper, etc.)",icon:"📄",size:Ir.length,code:Ir,mime:"text/html"}];function Ff(){const[c,x]=ne.useState(!1);return i.jsxs("div",{className:"space-y-6",children:[i.jsx("div",{className:"bg-white border border-slate-200 rounded-lg p-5",children:i.jsxs("div",{className:"flex items-start gap-3",children:[i.jsx("div",{className:"w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center flex-shrink-0",children:i.jsx(pd,{className:"w-5 h-5 text-white"})}),i.jsxs("div",{className:"flex-1",children:[i.jsx("h2",{style:{fontSize:"18px"},className:"text-slate-900 mb-1",children:"Struttura Repository GitHub"}),i.jsxs("p",{className:"text-slate-600",style:{fontSize:"13px",lineHeight:"1.7"},children:["Separazione netta tra"," ",i.jsx("strong",{className:"text-emerald-700",children:"output deployabile"})," ","(i 4 file Katana in"," ",i.jsx("code",{className:"bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200",children:"dist/"}),") e"," ",i.jsx("strong",{className:"text-blue-700",children:"dev tool di analisi"})," ","(l'app React in"," ",i.jsx("code",{className:"bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200",children:"tool/"}),"). Il repo"," ",i.jsx("code",{className:"text-slate-700",children:"zatteogit/katana"})," ","ospita entrambi con commit history separata."]})]})]})}),i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[i.jsxs("div",{className:"bg-emerald-50 border border-emerald-200 rounded-lg p-4",children:[i.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[i.jsx(sf,{className:"w-4 h-4 text-emerald-600"}),i.jsxs("span",{className:"text-emerald-900",style:{fontSize:"14px"},children:[i.jsx("code",{children:"dist/"})," — Output Katana"]})]}),i.jsxs("div",{className:"text-emerald-800 space-y-1.5",style:{fontSize:"12px",lineHeight:"1.6"},children:[i.jsxs("p",{children:[i.jsx("strong",{children:"4 file vanilla"})," (JS + CSS + HTML) pronti per il deploy."]}),i.jsxs("p",{children:["Funzionano ",i.jsx("strong",{children:"offline"})," aprendo"," ",i.jsx("code",{children:"index.html"})," nel browser."]}),i.jsx("p",{children:'Aggiornati copy-pastando dal tab "Codice Katana" o scaricando da qui.'})]}),i.jsxs("div",{className:"mt-3 flex items-center gap-2",children:[i.jsx("span",{className:"px-2 py-1 rounded bg-emerald-200/60 text-emerald-800 border border-emerald-300",style:{fontSize:"10px",fontFamily:"monospace"},children:"data.js"}),i.jsx("span",{className:"px-2 py-1 rounded bg-emerald-200/60 text-emerald-800 border border-emerald-300",style:{fontSize:"10px",fontFamily:"monospace"},children:"script.js"}),i.jsx("span",{className:"px-2 py-1 rounded bg-emerald-200/60 text-emerald-800 border border-emerald-300",style:{fontSize:"10px",fontFamily:"monospace"},children:"style.css"}),i.jsx("span",{className:"px-2 py-1 rounded bg-emerald-200/60 text-emerald-800 border border-emerald-300",style:{fontSize:"10px",fontFamily:"monospace"},children:"index.html"})]})]}),i.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4",children:[i.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[i.jsx(Ji,{className:"w-4 h-4 text-blue-600"}),i.jsxs("span",{className:"text-blue-900",style:{fontSize:"14px"},children:[i.jsx("code",{children:"tool/"})," — Dev Tool React"]})]}),i.jsxs("div",{className:"text-blue-800 space-y-1.5",style:{fontSize:"12px",lineHeight:"1.6"},children:[i.jsxs("p",{children:["App ",i.jsx("strong",{children:"Vite + React + Tailwind"})," per analisi frame Figma."]}),i.jsx("p",{children:"Confronta misure Figma vs SITE_CONFIG, genera JSON corretto, preview live."}),i.jsxs("p",{children:["Contiene i sorgenti TS dei 4 file in"," ",i.jsx("code",{children:"katana-files/"}),"."]})]}),i.jsxs("div",{className:"mt-3 flex items-center gap-2",children:[i.jsx("span",{className:"px-2 py-1 rounded bg-blue-200/60 text-blue-800 border border-blue-300",style:{fontSize:"10px",fontFamily:"monospace"},children:"React"}),i.jsx("span",{className:"px-2 py-1 rounded bg-blue-200/60 text-blue-800 border border-blue-300",style:{fontSize:"10px",fontFamily:"monospace"},children:"Tailwind"}),i.jsx("span",{className:"px-2 py-1 rounded bg-blue-200/60 text-blue-800 border border-blue-300",style:{fontSize:"10px",fontFamily:"monospace"},children:"Vite"}),i.jsx("span",{className:"px-2 py-1 rounded bg-blue-200/60 text-blue-800 border border-blue-300",style:{fontSize:"10px",fontFamily:"monospace"},children:"TypeScript"})]})]})]}),i.jsxs("div",{className:"bg-white border border-slate-200 rounded-lg p-4",children:[i.jsx("h3",{className:"text-slate-800 mb-3",style:{fontSize:"13px"},children:"Flusso dati"}),i.jsxs("div",{className:"flex items-center justify-center gap-3 flex-wrap",children:[i.jsxs("div",{className:"px-3 py-2 rounded border bg-amber-50 border-amber-200 text-amber-800 text-center",style:{fontSize:"11px"},children:[i.jsx("div",{style:{fontFamily:"monospace"},children:"katana-files/*.ts"}),i.jsx("div",{className:"text-amber-600",style:{fontSize:"9px"},children:"Sorgente TypeScript"})]}),i.jsx(Vl,{className:"w-4 h-4 text-slate-400 flex-shrink-0"}),i.jsxs("div",{className:"px-3 py-2 rounded border bg-blue-50 border-blue-200 text-blue-800 text-center",style:{fontSize:"11px"},children:[i.jsx("div",{style:{fontFamily:"monospace"},children:"KatanaCodeTab.tsx"}),i.jsx("div",{className:"text-blue-600",style:{fontSize:"9px"},children:"Render + Copy UI"})]}),i.jsx(Vl,{className:"w-4 h-4 text-slate-400 flex-shrink-0"}),i.jsxs("div",{className:"px-3 py-2 rounded border bg-emerald-50 border-emerald-200 text-emerald-800 text-center",style:{fontSize:"11px"},children:[i.jsx("div",{style:{fontFamily:"monospace"},children:"dist/"}),i.jsx("div",{className:"text-emerald-600",style:{fontSize:"9px"},children:"File pronti"})]}),i.jsx(Vl,{className:"w-4 h-4 text-slate-400 flex-shrink-0"}),i.jsxs("div",{className:"px-3 py-2 rounded border bg-violet-50 border-violet-200 text-violet-800 text-center",style:{fontSize:"11px"},children:[i.jsx("div",{style:{fontFamily:"monospace"},children:"GitHub / Notion"}),i.jsx("div",{className:"text-violet-600",style:{fontSize:"9px"},children:"Deploy"})]})]})]}),i.jsxs("div",{className:"bg-white border border-slate-200 rounded-lg overflow-hidden",children:[i.jsxs("div",{className:"px-4 py-3 border-b border-slate-200 flex items-center gap-2",children:[i.jsx(Yp,{className:"w-4 h-4 text-slate-500"}),i.jsx("span",{className:"text-slate-800",style:{fontSize:"14px"},children:"Struttura consigliata"}),i.jsx("span",{className:"text-slate-400 ml-1",style:{fontSize:"12px",fontFamily:"monospace"},children:"zatteogit/katana"})]}),i.jsx("div",{className:"p-3 bg-slate-50",children:i.jsx(fd,{item:If})})]}),i.jsxs("div",{className:"bg-white border border-slate-200 rounded-lg p-5",children:[i.jsxs("div",{className:"flex items-center justify-between mb-4",children:[i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx(Mn,{className:"w-4 h-4 text-emerald-600"}),i.jsxs("h3",{className:"text-slate-800",style:{fontSize:"14px"},children:["Scarica file per"," ",i.jsx("code",{className:"text-emerald-700",children:"dist/"})]})]}),i.jsxs("button",{onClick:Ef,className:"inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors",style:{fontSize:"12px"},children:[i.jsx(Mn,{className:"w-3.5 h-3.5"}),"Scarica tutti (4 file)"]})]}),i.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:Af.map(p=>i.jsxs("div",{className:"flex items-center justify-between p-3 rounded-md border border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50/30 transition-colors",children:[i.jsxs("div",{className:"flex items-center gap-3",children:[i.jsx("span",{style:{fontSize:"20px"},children:p.icon}),i.jsxs("div",{children:[i.jsx("div",{className:"text-slate-800",style:{fontSize:"13px",fontFamily:"monospace"},children:p.name}),i.jsx("div",{className:"text-slate-500",style:{fontSize:"11px"},children:p.desc}),i.jsxs("div",{className:"text-slate-400",style:{fontSize:"10px"},children:[(p.size/1024).toFixed(1)," KB"]})]})]}),i.jsx("button",{onClick:()=>Kl(p.name,p.code,p.mime),className:"p-2 rounded border border-slate-200 bg-white hover:border-emerald-300 hover:text-emerald-600 transition-colors text-slate-500",title:`Scarica ${p.name}`,children:i.jsx(Mn,{className:"w-3.5 h-3.5"})})]},p.name))})]}),i.jsxs("div",{className:"bg-slate-900 rounded-lg overflow-hidden border border-slate-700",children:[i.jsxs("div",{className:"px-4 py-2.5 bg-slate-800 border-b border-slate-700 flex items-center justify-between cursor-pointer hover:bg-slate-750 transition-colors",onClick:()=>x(!c),children:[i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx(ff,{className:"w-4 h-4 text-slate-400"}),i.jsx("span",{className:"text-slate-300",style:{fontSize:"13px"},children:"Comandi Git per la riorganizzazione"})]}),i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx(Wi,{text:cd,label:"Copia comandi"}),c?i.jsx(Ul,{className:"w-4 h-4 text-slate-500"}):i.jsx(Gl,{className:"w-4 h-4 text-slate-500"})]})]}),c&&i.jsx("pre",{className:"p-4 text-slate-200 overflow-auto",style:{fontSize:"12px",lineHeight:"1.6",fontFamily:"'SF Mono', 'Fira Code', 'Consolas', monospace"},children:cd})]}),i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[i.jsxs("div",{className:"bg-white border border-slate-200 rounded-lg overflow-hidden",children:[i.jsxs("div",{className:"px-4 py-2.5 border-b border-slate-200 flex items-center justify-between",children:[i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx(id,{className:"w-4 h-4 text-slate-500"}),i.jsx("span",{className:"text-slate-700",style:{fontSize:"13px",fontFamily:"monospace"},children:".gitignore"})]}),i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx(Wi,{text:$i}),i.jsx("button",{onClick:()=>Kl(".gitignore",$i),className:"p-1.5 rounded border border-slate-200 text-slate-500 hover:text-slate-700 transition-colors",title:"Scarica .gitignore",children:i.jsx(Mn,{className:"w-3 h-3"})})]})]}),i.jsx("pre",{className:"p-3 text-slate-700 overflow-auto bg-slate-50",style:{fontSize:"11px",lineHeight:"1.5",fontFamily:"monospace",maxHeight:200},children:$i})]}),i.jsxs("div",{className:"bg-white border border-slate-200 rounded-lg overflow-hidden",children:[i.jsxs("div",{className:"px-4 py-2.5 border-b border-slate-200 flex items-center justify-between",children:[i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx(id,{className:"w-4 h-4 text-slate-500"}),i.jsx("span",{className:"text-slate-700",style:{fontSize:"13px",fontFamily:"monospace"},children:"README.md"})]}),i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx(Wi,{text:Qi}),i.jsx("button",{onClick:()=>Kl("README.md",Qi,"text/markdown"),className:"p-1.5 rounded border border-slate-200 text-slate-500 hover:text-slate-700 transition-colors",title:"Scarica README.md",children:i.jsx(Mn,{className:"w-3 h-3"})})]})]}),i.jsx("pre",{className:"p-3 text-slate-700 overflow-auto bg-slate-50",style:{fontSize:"11px",lineHeight:"1.5",fontFamily:"monospace",maxHeight:200},children:Qi})]})]}),i.jsxs("div",{className:"bg-slate-50 border border-slate-200 rounded-lg p-5",children:[i.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[i.jsx(ef,{className:"w-4 h-4 text-slate-500"}),i.jsx("h3",{className:"text-slate-800",style:{fontSize:"14px"},children:"Note per il push su GitHub"})]}),i.jsxs("div",{className:"space-y-2",style:{fontSize:"12px",lineHeight:"1.6"},children:[i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx("span",{className:"text-slate-400 mt-0.5 flex-shrink-0",children:"1."}),i.jsxs("span",{className:"text-slate-700",children:[i.jsxs("strong",{children:[i.jsx("code",{children:"dist/"})," va committato:"]})," ","Contiene i file deployabili finali. Non aggiungerlo a ",i.jsx("code",{children:".gitignore"}),". Questi sono gli artefatti che vengono copiati su Notion o serviti direttamente."]})]}),i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx("span",{className:"text-slate-400 mt-0.5 flex-shrink-0",children:"2."}),i.jsxs("span",{className:"text-slate-700",children:[i.jsxs("strong",{children:[i.jsx("code",{children:"tool/dist/"})," NON va committato:"]})," ","È l'output di build del dev tool React (generato da ",i.jsx("code",{children:"vite build"}),"). Questo sì va in"," ",i.jsx("code",{children:".gitignore"}),"."]})]}),i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx("span",{className:"text-slate-400 mt-0.5 flex-shrink-0",children:"3."}),i.jsxs("span",{className:"text-slate-700",children:[i.jsx("strong",{children:"Aggiornamento dist/:"})," Quando modifichi i file in"," ",i.jsx("code",{children:"katana-files/*.ts"}),", scarica i 4 file aggiornati da questo tab e sostituiscili in"," ",i.jsx("code",{children:"dist/"})," prima del commit."]})]}),i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx("span",{className:"text-slate-400 mt-0.5 flex-shrink-0",children:"4."}),i.jsxs("span",{className:"text-slate-700",children:[i.jsx("strong",{children:"Commit message convention:"})," ",i.jsx("code",{children:"feat(dist):"})," per modifiche ai file output, ",i.jsx("code",{children:"feat(tool):"})," per modifiche al dev tool. Mantiene la storia chiara."]})]}),i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx("span",{className:"text-slate-400 mt-0.5 flex-shrink-0",children:"5."}),i.jsxs("span",{className:"text-slate-700",children:[i.jsx("strong",{children:"Il commit iniziale"})," (",i.jsx("code",{children:"bea59e9"}),") contiene config, stili e"," ",i.jsx("code",{children:".gitignore"}),". Il prossimo push deve aggiungere sia ",i.jsx("code",{children:"dist/"})," che"," ",i.jsx("code",{children:"tool/"})," con commit separati."]})]})]})]})]})}const _f=[{value:"all",label:"Tutti",icon:i.jsx(Ji,{className:"w-3.5 h-3.5"})},{value:"mismatch",label:"Mismatch",icon:i.jsx(ta,{className:"w-3.5 h-3.5"})},{value:"focus_add",label:"Focus",icon:i.jsx(jr,{className:"w-3.5 h-3.5"})},{value:"new_component",label:"Nuovi",icon:i.jsx(Bn,{className:"w-3.5 h-3.5"})},{value:"new_variant",label:"Varianti",icon:i.jsx(Bn,{className:"w-3.5 h-3.5"})},{value:"ok",label:"OK",icon:i.jsx(Xi,{className:"w-3.5 h-3.5"})}];function yt({label:c,count:x,color:p,icon:T}){return i.jsxs("div",{className:`rounded-lg border p-3 ${p}`,children:[i.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[T,i.jsx("span",{style:{fontSize:"11px"},className:"uppercase tracking-wider opacity-70",children:c})]}),i.jsx("div",{style:{fontSize:"28px",fontFamily:"monospace"},children:x})]})}function Lf({component:c,entries:x}){const[p,T]=ne.useState(!0),z=x.some(F=>F.status!=="ok"),C=x.some(F=>F.figmaOverlays.length>0);return i.jsxs("div",{className:"mb-4",children:[i.jsxs("button",{onClick:()=>T(!p),className:"flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 transition-colors",children:[p?i.jsx(Ul,{className:"w-4 h-4 text-slate-400"}):i.jsx(Gl,{className:"w-4 h-4 text-slate-400"}),i.jsx("span",{style:{fontSize:"14px"},className:"text-slate-800",children:c}),i.jsxs("span",{className:"text-muted-foreground",style:{fontSize:"12px"},children:["(",x.length," frame)"]}),i.jsxs("div",{className:"ml-auto flex items-center gap-2",children:[C&&i.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700",style:{fontSize:"10px"},children:[i.jsx(un,{className:"w-3 h-3"}),"oz"]}),z&&i.jsx(ea,{className:"w-3.5 h-3.5 text-amber-500"})]})]}),p&&i.jsx("div",{className:"space-y-2 pl-2 mt-1",children:x.map((F,H)=>i.jsx(Sf,{entry:F},H))})]})}function Pf(){return i.jsxs("div",{className:"space-y-6",children:[i.jsxs("div",{className:"bg-white border border-slate-200 rounded-lg p-5",children:[i.jsxs("h2",{style:{fontSize:"18px"},className:"text-slate-900 mb-2",children:["Proposta di estensione:"," ",i.jsx("code",{className:"text-blue-600",children:"oz"})," (Overlay Zones)"]}),i.jsxs("p",{className:"text-slate-600",style:{fontSize:"13px",lineHeight:"1.7"},children:["I frame Figma mostrano due tipi di zone che il config attuale non gestisce: l'",i.jsx("strong",{children:"Area Testi"})," ","(dove il frontend sovrappone testo/gradient all'immagine) e l'",i.jsx("strong",{children:"Area Loghi"}),' (dove compaiono badge e loghi certificazioni). Queste zone sono "esclusioni" per il crop: il soggetto principale non dovrebbe finire sotto di esse.']})]}),i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[i.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4",children:[i.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[i.jsx(jr,{className:"w-4 h-4 text-blue-600"}),i.jsxs("span",{className:"text-blue-900",style:{fontSize:"14px"},children:[i.jsx("code",{children:"f"})," — Focus Area"]})]}),i.jsxs("p",{className:"text-blue-800",style:{fontSize:"12px",lineHeight:"1.6"},children:[i.jsx("strong",{children:"Dove METTERE il soggetto."})," Il crop tool centra e assicura che il soggetto rientri in quest'area. Esiste già nello schema."]}),i.jsxs("div",{className:"mt-3 bg-blue-100/60 rounded p-2",style:{fontSize:"11px",fontFamily:"monospace"},children:["f: ","{"," x, y, w, h ","}"]})]}),i.jsx("div",{className:"flex items-center justify-center",children:i.jsxs("div",{className:"flex flex-col items-center gap-1 text-slate-400",children:[i.jsx(Vl,{className:"w-6 h-6"}),i.jsx("span",{style:{fontSize:"10px"},children:"complementari"})]})}),i.jsxs("div",{className:"bg-yellow-50 border border-yellow-200 rounded-lg p-4",children:[i.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[i.jsx(un,{className:"w-4 h-4 text-yellow-700"}),i.jsxs("span",{className:"text-yellow-900",style:{fontSize:"14px"},children:[i.jsx("code",{children:"oz"})," — Overlay Zones"]})]}),i.jsxs("p",{className:"text-yellow-800",style:{fontSize:"12px",lineHeight:"1.6"},children:[i.jsx("strong",{children:"Dove NON mettere il soggetto."})," ","Elementi UI (testi, loghi) coprono queste aree. Il crop tool le mostra come hint visivo.",i.jsx("strong",{children:" Nuova proprietà."})]}),i.jsxs("div",{className:"mt-3 bg-yellow-100/60 rounded p-2",style:{fontSize:"11px",fontFamily:"monospace"},children:["oz: [ ","{"," t, l, x, y, w, h ","}"," ]"]})]})]}),i.jsxs("div",{className:"bg-slate-900 rounded-lg overflow-hidden border border-slate-700",children:[i.jsxs("div",{className:"px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between",children:[i.jsx("span",{className:"text-slate-400",style:{fontSize:"12px",fontFamily:"monospace"},children:"schema_oz.js"}),i.jsx("span",{className:"text-slate-500",style:{fontSize:"11px"},children:"Definizione proprietà"})]}),i.jsx("pre",{className:"p-4 text-slate-200 overflow-auto",style:{fontSize:"12px",lineHeight:"1.6",fontFamily:"'SF Mono', 'Fira Code', monospace"},children:`/**
 * LEGENDA CHIAVI OVERLAY ZONE:
 * - oz:  (Overlay Zones) Array di zone di esclusione per il crop.
 *        Indica le aree coperte da elementi UI (testo, loghi).
 *        Il soggetto NON dovrebbe trovarsi in queste zone.
 *
 * Chiavi di ogni zona:
 * - t:   Tipo. "text" = Area Testi (gradient + copy).
 *                "badge" = Area Loghi (loghi/premi/certificazioni).
 * - l:   Label descrittiva della zona (per UI del cropper).
 * - x:   Coordinata X (left) in px, relativa all'asset @1x.
 * - y:   Coordinata Y (top) in px, relativa all'asset @1x.
 * - w:   Larghezza della zona in px @1x.
 * - h:   Altezza della zona in px @1x.
 */

// Esempio completo su un asset:
{
  id: "desktop",
  type: "img",
  label: "Desktop (LG+)",
  w: 2000,
  h: 400,
  d: false,
  fl: "Destra",
  f:  { x: 936, y: 0, w: 552, h: 400 },     // ← soggetto QUI
  oz: [                                        // ← soggetto NON qui
    { t: "text",  l: "Area Testi", x: 338,  y: 0,   w: 598, h: 400 },
    { t: "badge", l: "Area Loghi",  x: 1205, y: 272, w: 408, h: 108 }
  ],
  targetKB: 150
}`})]}),i.jsxs("div",{className:"bg-white border border-slate-200 rounded-lg p-5",children:[i.jsx("h3",{style:{fontSize:"14px"},className:"text-slate-800 mb-3",children:"Come funziona nel cropper"}),i.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[i.jsx("div",{className:"flex-1",children:i.jsxs("div",{className:"relative bg-slate-100 border border-slate-300 rounded-md overflow-hidden",style:{height:"180px"},children:[i.jsx("div",{className:"absolute bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center",style:{left:"5%",top:0,width:"35%",height:"100%"},children:i.jsx("span",{className:"text-yellow-800 rotate-[-90deg] whitespace-nowrap",style:{fontSize:"10px"},children:"oz: text"})}),i.jsx("div",{className:"absolute bg-pink-400/20 border border-pink-400/50 flex items-center justify-center",style:{right:"5%",bottom:"10%",width:"25%",height:"25%"},children:i.jsx("span",{className:"text-pink-800",style:{fontSize:"9px"},children:"oz: badge"})}),i.jsx("div",{className:"absolute bg-blue-500/20 border-2 border-blue-500/60 border-dashed flex items-center justify-center",style:{right:"3%",top:0,width:"35%",height:"100%"},children:i.jsx("span",{className:"text-blue-700",style:{fontSize:"11px"},children:"f: focus"})}),i.jsx("div",{className:"absolute rounded-full bg-slate-400/30 border-2 border-slate-500/40 flex items-center justify-center",style:{right:"10%",top:"15%",width:"20%",height:"65%"},children:i.jsx("span",{className:"text-slate-600",style:{fontSize:"9px"},children:"soggetto"})})]})}),i.jsxs("div",{className:"flex-1 space-y-3",style:{fontSize:"12px",lineHeight:"1.6"},children:[i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx("span",{className:"w-3 h-3 mt-0.5 rounded-sm bg-blue-400/40 border border-blue-500/60 flex-shrink-0"}),i.jsxs("span",{className:"text-slate-700",children:[i.jsx("strong",{className:"text-blue-700",children:"f (focus):"})," ","Il cropper guida l'utente a posizionare il soggetto entro quest'area."]})]}),i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx("span",{className:"w-3 h-3 mt-0.5 rounded-sm bg-yellow-400/40 border border-yellow-400/60 flex-shrink-0"}),i.jsxs("span",{className:"text-slate-700",children:[i.jsx("strong",{className:"text-yellow-700",children:"oz text:"})," ","Zona coperta da titolo, sottotitolo e gradient. Il soggetto sotto risulterebbe illeggibile."]})]}),i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx("span",{className:"w-3 h-3 mt-0.5 rounded-sm bg-pink-400/40 border border-pink-400/60 flex-shrink-0"}),i.jsxs("span",{className:"text-slate-700",children:[i.jsx("strong",{className:"text-pink-700",children:"oz badge:"})," ","Zona loghi/premi che copre l'immagine. Il soggetto sotto risulterebbe nascosto."]})]})]})]})]}),i.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[i.jsx(yt,{label:"Frame con overlay",count:Et.totalWithOverlays,color:"bg-yellow-50 border-yellow-200 text-yellow-800",icon:i.jsx(un,{className:"w-4 h-4 text-yellow-600"})}),i.jsx(yt,{label:"Zone testo",count:Et.totalTextZones,color:"bg-yellow-50 border-yellow-200 text-yellow-800",icon:i.jsx("span",{className:"w-4 h-4 rounded-sm bg-yellow-400/40 border border-yellow-400/60"})}),i.jsx(yt,{label:"Zone badge",count:Et.totalBadgeZones,color:"bg-pink-50 border-pink-200 text-pink-800",icon:i.jsx("span",{className:"w-4 h-4 rounded-sm bg-pink-400/40 border border-pink-400/60"})})]}),i.jsxs("div",{className:"bg-slate-50 border border-slate-200 rounded-lg p-5",children:[i.jsx("h3",{style:{fontSize:"14px"},className:"text-slate-800 mb-3",children:"Note di integrazione"}),i.jsxs("div",{className:"space-y-2",style:{fontSize:"12px",lineHeight:"1.6"},children:[i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx("span",{className:"text-slate-400 mt-0.5",children:"1."}),i.jsxs("span",{className:"text-slate-700",children:[i.jsx("strong",{children:"Retrocompatibile:"})," ",i.jsx("code",{children:"oz"})," ","è opzionale. Gli asset senza overlay continuano a funzionare esattamente come prima."]})]}),i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx("span",{className:"text-slate-400 mt-0.5",children:"2."}),i.jsxs("span",{className:"text-slate-700",children:[i.jsx("strong",{children:"Chiavi brevi:"})," Segue la convenzione esistente (f, fl, d, m, w, h).",i.jsx("code",{children:" t"})," = tipo, ",i.jsx("code",{children:"l"})," = label."]})]}),i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx("span",{className:"text-slate-400 mt-0.5",children:"3."}),i.jsxs("span",{className:"text-slate-700",children:[i.jsx("strong",{children:"Coordinate assolute:"})," x, y, w, h sono in px @1x relativi all'asset, stessa convenzione di ",i.jsx("code",{children:"f"}),"."]})]}),i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx("span",{className:"text-slate-400 mt-0.5",children:"4."}),i.jsxs("span",{className:"text-slate-700",children:[i.jsx("strong",{children:"Rendering nel cropper:"})," Le zone vanno disegnate come overlay semi-trasparenti con bordo. Suggerimento: giallo per ",i.jsx("code",{children:"text"}),", rosa per ",i.jsx("code",{children:"badge"}),"."]})]}),i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx("span",{className:"text-slate-400 mt-0.5",children:"5."}),i.jsxs("span",{className:"text-slate-700",children:[i.jsx("strong",{children:"Estensibile:"})," Il campo"," ",i.jsx("code",{children:"t"}),' può ospitare futuri tipi (es. "cta", "nav", "watermark") senza cambiare lo schema.']})]})]})]})]})}function Rf(){const[c,x]=ne.useState("all"),[p,T]=ne.useState(!1),[z,C]=ne.useState("analysis"),F=ne.useMemo(()=>{const L={total:0,ok:0,mismatch:0,focus_add:0,new_component:0,new_variant:0};return On.forEach(le=>{L.total++,L[le.status]++}),L},[]),H=ne.useMemo(()=>c==="all"?On:On.filter(L=>L.status===c),[c]),K=ne.useMemo(()=>{const L={};return H.forEach(le=>{const xe=le.configComponent||(le.status==="new_component"?le.figmaFrame.replace(/-$/,"").replace(/Corp/,"").replace(/Nome/,""):"Sconosciuto");L[xe]||(L[xe]=[]),L[xe].push(le)}),L},[H]),re=ne.useMemo(()=>JSON.stringify(hf,null,2),[]),ae=async()=>{try{await navigator.clipboard.writeText(re),T(!0),setTimeout(()=>T(!1),2e3)}catch{const L=document.createElement("textarea");L.value=re,document.body.appendChild(L),L.select(),document.execCommand("copy"),document.body.removeChild(L),T(!0),setTimeout(()=>T(!1),2e3)}},Y=[{id:"analysis",label:"Analisi",icon:i.jsx(qp,{className:"w-3.5 h-3.5"})},{id:"schema",label:"Schema oz",icon:i.jsx(Np,{className:"w-3.5 h-3.5"})},{id:"preview",label:"Preview",icon:i.jsx(Hp,{className:"w-3.5 h-3.5"})},{id:"json",label:"JSON Corretto",icon:i.jsx(Up,{className:"w-3.5 h-3.5"})},{id:"code",label:"Codice Katana",icon:i.jsx(_p,{className:"w-3.5 h-3.5"})},{id:"repo",label:"Repo",icon:i.jsx(pd,{className:"w-3.5 h-3.5"})}];return i.jsxs("div",{className:"min-h-screen bg-slate-50",children:[i.jsx("header",{className:"bg-white border-b border-slate-200 sticky top-0 z-10",children:i.jsxs("div",{className:"max-w-5xl mx-auto px-4 py-3 flex items-center gap-3",children:[i.jsx("div",{className:"w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center",children:i.jsx(jr,{className:"w-4 h-4 text-white"})}),i.jsxs("div",{children:[i.jsx("h1",{className:"text-slate-900",style:{fontSize:"16px"},children:"Katana Frame Analyzer"}),i.jsx("p",{className:"text-muted-foreground",style:{fontSize:"11px"},children:"Analisi misure Figma vs SITE_CONFIG · Corporate · con Overlay Zones"})]}),i.jsx("div",{className:"ml-auto flex items-center gap-1 bg-slate-100 rounded-lg p-0.5",children:Y.map(L=>i.jsx("button",{onClick:()=>C(L.id),className:`px-3 py-1.5 rounded-md transition-colors ${z===L.id?"bg-white shadow-sm text-slate-800":"text-slate-500 hover:text-slate-700"}`,style:{fontSize:"12px"},children:i.jsxs("span",{className:"flex items-center gap-1.5",children:[L.icon,i.jsx("span",{className:"hidden sm:inline",children:L.label})]})},L.id))})]})}),i.jsxs("main",{className:"max-w-5xl mx-auto px-4 py-6",children:[z==="analysis"&&i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6",children:[i.jsx(yt,{label:"Frame totali",count:F.total,color:"bg-white border-slate-200 text-slate-800",icon:i.jsx(Ji,{className:"w-4 h-4 text-slate-500"})}),i.jsx(yt,{label:"Confermati",count:F.ok,color:"bg-emerald-50 border-emerald-200 text-emerald-800",icon:i.jsx(Xi,{className:"w-4 h-4 text-emerald-600"})}),i.jsx(yt,{label:"Mismatch",count:F.mismatch,color:"bg-red-50 border-red-200 text-red-800",icon:i.jsx(ta,{className:"w-4 h-4 text-red-600"})}),i.jsx(yt,{label:"Focus",count:F.focus_add,color:"bg-blue-50 border-blue-200 text-blue-800",icon:i.jsx(jr,{className:"w-4 h-4 text-blue-600"})}),i.jsx(yt,{label:"Overlay Zones",count:Et.totalWithOverlays,color:"bg-yellow-50 border-yellow-200 text-yellow-800",icon:i.jsx(un,{className:"w-4 h-4 text-yellow-600"})}),i.jsx(yt,{label:"Nuovi comp.",count:F.new_component,color:"bg-violet-50 border-violet-200 text-violet-800",icon:i.jsx(Bn,{className:"w-4 h-4 text-violet-600"})}),i.jsx(yt,{label:"Nuove var.",count:F.new_variant,color:"bg-amber-50 border-amber-200 text-amber-800",icon:i.jsx(Bn,{className:"w-4 h-4 text-amber-600"})})]}),i.jsxs("div",{className:"flex items-center gap-2 mb-5 flex-wrap",children:[i.jsx("span",{className:"text-muted-foreground mr-1",style:{fontSize:"12px"},children:"Filtra:"}),_f.map(L=>i.jsxs("button",{onClick:()=>x(L.value),className:`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors ${c===L.value?"bg-slate-800 text-white border-slate-800":"bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`,style:{fontSize:"12px"},children:[L.icon,L.label]},L.value))]}),i.jsxs("div",{children:[Object.entries(K).map(([L,le])=>i.jsx(Lf,{component:L,entries:le},L)),H.length===0&&i.jsx("div",{className:"text-center py-12 text-muted-foreground",children:"Nessun frame corrisponde al filtro selezionato."})]})]}),z==="schema"&&i.jsx(Pf,{}),z==="preview"&&i.jsx(zf,{}),z==="json"&&i.jsxs("div",{children:[i.jsxs("div",{className:"flex items-center justify-between mb-4",children:[i.jsxs("div",{children:[i.jsx("h2",{style:{fontSize:"16px"},className:"text-slate-800",children:"SITE_CONFIG Corporate — Corretto"}),i.jsx("p",{className:"text-muted-foreground mt-0.5",style:{fontSize:"12px"},children:"JSON con correzioni dimensionali, focus areas e overlay zones (oz)."})]}),i.jsx("button",{onClick:ae,className:`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${p?"bg-emerald-50 border-emerald-300 text-emerald-700":"bg-white border-slate-200 text-slate-700 hover:border-slate-400"}`,style:{fontSize:"13px"},children:p?i.jsxs(i.Fragment,{children:[i.jsx(qi,{className:"w-4 h-4"}),"Copiato!"]}):i.jsxs(i.Fragment,{children:[i.jsx(Yi,{className:"w-4 h-4"}),"Copia JSON"]})})]}),i.jsx("div",{className:"bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4",children:i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx(ea,{className:"w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0"}),i.jsxs("div",{style:{fontSize:"13px"},className:"text-amber-900",children:[i.jsx("p",{className:"mb-2",children:i.jsx("strong",{children:"Riepilogo correzioni applicate:"})}),i.jsxs("ul",{className:"space-y-1 list-disc pl-4",children:[i.jsxs("li",{children:[i.jsx("strong",{children:"Module Boxed Mobile:"})," w: 575 → 535"]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Card Portrait 2:3:"})," ","800×1200 → 400×600"]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Card Portrait 4:5:"})," ","800×1000 → 400×500"]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Visual Minimal Desktop:"})," ","w: 2000 → 1728"]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Visual Multi col-6:"})," w: 700 → 864"]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Aree focus (f):"})," aggiunte a 10 asset"]}),i.jsxs("li",{className:"text-yellow-800",children:[i.jsx("strong",{children:"Overlay Zones (oz):"})," ","aggiunte a Module Photo Display (3 breakpoint) e Photo Alto (3 breakpoint) — ",Et.totalTextZones," zone testo + ",Et.totalBadgeZones," ","zone badge"]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Nuova variante:"})," Card Portrait 9:10, Module Photo Alto"]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Nuovi componenti:"})," Content Evidence, Box Rack Badge Loghi"]})]})]})]})}),i.jsxs("div",{className:"relative rounded-lg border border-slate-200 bg-slate-900 overflow-hidden",children:[i.jsxs("div",{className:"flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700",children:[i.jsx("span",{style:{fontSize:"12px"},className:"text-slate-400 font-mono",children:"corporate_config_corrected.json"}),i.jsxs("span",{style:{fontSize:"11px"},className:"text-slate-500",children:[(re.length/1024).toFixed(1)," KB"]})]}),i.jsx("pre",{className:"p-4 overflow-auto text-slate-200 max-h-[70vh]",style:{fontSize:"12px",lineHeight:"1.5",fontFamily:"'SF Mono', 'Fira Code', monospace"},children:re})]})]}),z==="code"&&i.jsx(Nf,{}),z==="repo"&&i.jsx(Ff,{})]}),i.jsx("footer",{className:"border-t border-slate-200 bg-white mt-8",children:i.jsxs("div",{className:"max-w-5xl mx-auto px-4 py-3 flex items-center justify-between",children:[i.jsxs("span",{className:"text-muted-foreground",style:{fontSize:"11px"},children:["Katana Frame Analyzer · ",F.total," frame · ",Et.totalWithOverlays," con overlay zones"]}),i.jsxs("span",{className:"text-muted-foreground",style:{fontSize:"11px"},children:[F.mismatch," mismatch ·"," ",F.new_component+F.new_variant," nuovi · ",F.focus_add," focus ·"," ",Et.totalTextZones+Et.totalBadgeZones," ","oz"]})]})})]})}vp.createRoot(document.getElementById("root")).render(i.jsx(Rf,{}));
