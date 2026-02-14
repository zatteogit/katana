import { useState, useMemo, useRef, forwardRef, useImperativeHandle } from "react";
import { dataJsCode } from "./katana-files/data-js-code";
import { scriptJsCode } from "./katana-files/script-js-code";
import { styleCssCode } from "./katana-files/style-css-code";
import { indexHtmlCode } from "./katana-files/index-html-code";
// preview-inject: solo dev mode (stable non lo usa)
import { previewInjectCode as previewInjectDevCode } from "./katana-files/preview-inject-dev";

/**
 * KatanaPreviewTab — Assembla e renderizza Katana in un iframe srcDoc
 * ====================================================================
 *
 * ARCHITETTURA BASELINE v3.0 STABLE
 * ----------------------------------
 * I 4 file sorgente in ./katana-files/ sono la versione STABILE verificata:
 *   - style-css-code.ts   → CSS (overlay, cropper, modal)
 *   - script-js-code.ts   → Logic (crop, detection, export)
 *   - data-js-code.ts     → STRINGS + SITE_CONFIG
 *   - index-html-code.ts  → HTML template + CDN references
 *
 * Una copia golden INTOCCABILE vive in ./katana-files/baseline/
 * (creata il 2026-02-14, freeze confermato dall'utente).
 *
 * FIX APPLICATI al v3.0 stable (rispetto alla versione GitHub rotta):
 *   1. RIMOSSA regex che strippava i <script> CDN → i CDN si caricano
 *   2. RIMOSSO attributo crossorigin dagli script (problemi CORS in srcdoc)
 *   3. FIX CSS .img-container img → rimosso !important, per non sovrascrivere
 *      gli stili inline di Cropper.js
 *   4. Modal optimization CSS usa :not(.cropper-hidden) per lo scope
 *
 * PIPELINE buildFullHtml(mode):
 *   stable → HTML puro + CDN + fallback stubs + inline (css/data/script)
 *   dev    → come stable + diagnostica PI_TRACE + preview-inject FAB
 *
 * NON TOCCARE i file in katana-files/ senza confrontare col baseline.
 * ====================================================================
 */

/**
 * Genera uno <script> con stub minimali per le 6 librerie CDN.
 * Ogni stub viene definito SOLO se il corrispondente global è undefined
 * (= il CDN non ha caricato). In questo modo:
 *   - online  → CDN carichi → libreria reale usata
 *   - sandbox → CDN bloccati → stub usato, Katana non crasha
 *
 * NOTA: tinycolor deve supportare:
 *   - input stringa "#abc123" e oggetto {r,g,b}
 *   - tinycolor.readability(c1,c2) (WCAG contrast ratio)
 *   - .darken(n), .lighten(n) chainable
 *   - .isLight(), .isDark(), .toHexString(), .toRgbString()
 */
function buildCdnFallbackScript(): string {
  var lines = [
    "/* CDN Fallback Stubs — Katana Preview */",

    // ---- smartcrop ----
    "if(typeof smartcrop==='undefined'){",
    "  window.smartcrop={crop:function(img,opts){",
    "    var w=opts.width||img.width,h=opts.height||img.height;",
    "    var sw=img.width||img.naturalWidth||w,sh=img.height||img.naturalHeight||h;",
    "    var scale=Math.max(w/sw,h/sh);",
    "    var cw=Math.min(w/scale,sw),ch=Math.min(h/scale,sh);",
    "    var cx=Math.round((sw-cw)/2),cy=Math.round((sh-ch)/2);",
    "    return Promise.resolve({topCrop:{x:cx,y:cy,width:Math.round(cw),height:Math.round(ch)}});",
    "  }};",
    "}",

    // ---- tinycolor (feature-complete stub) ----
    "if(typeof tinycolor==='undefined'){",
    "  (function(){",
    "    function parseToRgb(c){",
    "      if(!c) return {r:0,g:0,b:0};",
    "      if(typeof c==='object'&&c.r!==undefined) return {r:c.r||0,g:c.g||0,b:c.b||0};",
    "      var s=String(c).trim().toLowerCase();",
    "      if(s.charAt(0)==='#') s=s.substr(1);",
    "      if(s.length===3) s=s[0]+s[0]+s[1]+s[1]+s[2]+s[2];",
    "      if(s.length===8) s=s.substr(0,6);",
    "      var r=parseInt(s.substr(0,2),16),g=parseInt(s.substr(2,2),16),b=parseInt(s.substr(4,2),16);",
    "      return {r:isNaN(r)?0:r,g:isNaN(g)?0:g,b:isNaN(b)?0:b};",
    "    }",
    "    function clamp(v){return Math.max(0,Math.min(255,Math.round(v)))}",
    "    function pad2(s){return s.length<2?'0'+s:s}",
    "    function rgbToHex(r,g,b){return'#'+pad2(r.toString(16))+pad2(g.toString(16))+pad2(b.toString(16))}",
    "    function luminance(r,g,b){",
    "      var rs=r/255,gs=g/255,bs=b/255;",
    "      rs=rs<=0.03928?rs/12.92:Math.pow((rs+0.055)/1.055,2.4);",
    "      gs=gs<=0.03928?gs/12.92:Math.pow((gs+0.055)/1.055,2.4);",
    "      bs=bs<=0.03928?bs/12.92:Math.pow((bs+0.055)/1.055,2.4);",
    "      return 0.2126*rs+0.7152*gs+0.0722*bs;",
    "    }",
    "    function makeTc(rgb){",
    "      var r=clamp(rgb.r),g=clamp(rgb.g),b=clamp(rgb.b);",
    "      var br=(r*299+g*587+b*114)/1000;",
    "      function _upd(nr,ng,nb){r=clamp(nr);g=clamp(ng);b=clamp(nb);br=(r*299+g*587+b*114)/1000;obj._r=r;obj._g=g;obj._b=b}",
    "      var obj={",
    "        _r:r,_g:g,_b:b,",
    "        isLight:function(){return br>128},",
    "        isDark:function(){return br<=128},",
    "        toHex:function(){return pad2(r.toString(16))+pad2(g.toString(16))+pad2(b.toString(16))},",
    "        toHexString:function(){return rgbToHex(r,g,b)},",
    "        toHex8String:function(){return rgbToHex(r,g,b)+'ff'},",
    "        toRgb:function(){return{r:r,g:g,b:b,a:1}},",
    "        toRgbString:function(){return'rgb('+r+','+g+','+b+')'},",
    "        toString:function(){return rgbToHex(r,g,b)},",
    "        getBrightness:function(){return br},",
    "        getAlpha:function(){return 1},",
    "        setAlpha:function(){return obj},",
    "        darken:function(n){var f=1-((n||10)/100);_upd(r*f,g*f,b*f);return obj},",
    "        lighten:function(n){var f=(n||10)/100;_upd(r+(255-r)*f,g+(255-g)*f,b+(255-b)*f);return obj},",
    "        clone:function(){return makeTc({r:r,g:g,b:b})}",
    "      };",
    "      return obj;",
    "    }",
    "    window.tinycolor=function(c){return makeTc(parseToRgb(c))};",
    "    window.tinycolor.readability=function(c1,c2){",
    "      var rgb1=parseToRgb(typeof c1==='string'||typeof c1==='object'&&c1._r===undefined?c1:c1),",
    "          rgb2=parseToRgb(typeof c2==='string'||typeof c2==='object'&&c2._r===undefined?c2:c2);",
    "      if(c1&&c1._r!==undefined){rgb1={r:c1._r,g:c1._g,b:c1._b}}",
    "      if(c2&&c2._r!==undefined){rgb2={r:c2._r,g:c2._g,b:c2._b}}",
    "      var l1=luminance(rgb1.r,rgb1.g,rgb1.b),l2=luminance(rgb2.r,rgb2.g,rgb2.b);",
    "      return(Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);",
    "    };",
    "  })();",
    "}",

    // ---- Cropper ----
    "if(typeof Cropper==='undefined'){",
    "  window.Cropper=function(img,opts){",
    "    var self=this;self.element=img;self.options=opts||{};",
    "    var nw=img.naturalWidth||img.width||800,nh=img.naturalHeight||img.height||600;",
    "    var ar=opts.aspectRatio||nw/nh;",
    "    var data=opts.data?JSON.parse(JSON.stringify(opts.data)):{x:0,y:0,width:nw,height:Math.round(nw/ar),rotate:0,scaleX:1,scaleY:1};",
    "    if(!data.width)data.width=nw;if(!data.height)data.height=Math.round(data.width/ar);",
    "    self.getData=function(rounded){var d=JSON.parse(JSON.stringify(data));if(rounded){d.x=Math.round(d.x);d.y=Math.round(d.y);d.width=Math.round(d.width);d.height=Math.round(d.height)}return d};",
    "    self.getImageData=function(){return{naturalWidth:nw,naturalHeight:nh,width:img.width||nw,height:img.height||nh}};",
    "    self.getCanvasData=function(){return{left:0,top:0,width:nw,height:nh,naturalWidth:nw,naturalHeight:nh}};",
    "    self.getCroppedCanvas=function(o){",
    "      var c=document.createElement('canvas');c.width=(o&&o.width)||data.width;c.height=(o&&o.height)||data.height;",
    "      try{var ctx=c.getContext('2d');ctx.drawImage(img,data.x,data.y,data.width,data.height,0,0,c.width,c.height);}catch(e){}",
    "      return c;",
    "    };",
    "    self.setData=function(d){for(var k in d)data[k]=d[k];return self};",
    "    self.setAspectRatio=function(r){ar=r;data.height=Math.round(data.width/r);return self};",
    "    self.setCropBoxData=function(){return self};self.setCanvasData=function(){return self};",
    "    self.replace=function(){};self.reset=function(){};self.clear=function(){};",
    "    self.enable=function(){};self.disable=function(){};self.destroy=function(){};",
    "    self.move=function(){return self};self.zoomTo=function(){return self};self.zoom=function(){return self};self.rotate=function(){return self};",
    "    self.crop=function(){return self};",
    "    if(opts&&opts.ready)setTimeout(function(){opts.ready.call(self)},80);",
    "  };",
    "}",

    // ---- JSZip ----
    "if(typeof JSZip==='undefined'){",
    "  window.JSZip=function(){",
    "    var files={};",
    "    this.file=function(name,content,opts){files[name]={c:content,o:opts||{}};return this};",
    "    this.folder=function(){return this};",
    "    this.generateAsync=function(opts){",
    "      var type=(opts&&opts.type)||'blob';",
    "      if(type==='blob')return Promise.resolve(new Blob(['(JSZip stub)'],{type:'application/octet-stream'}));",
    "      return Promise.resolve('');",
    "    };",
    "  };",
    "}",

    // ---- FileSaver ----
    "if(typeof saveAs==='undefined'){",
    "  window.saveAs=function(blob,name){",
    "    var u=URL.createObjectURL(blob);var a=document.createElement('a');a.href=u;a.download=name||'download';",
    "    document.body.appendChild(a);a.click();document.body.removeChild(a);",
    "    setTimeout(function(){URL.revokeObjectURL(u)},100);",
    "  };",
    "}",

    // ---- Bootstrap (Modal with instance tracking) ----
    "if(typeof bootstrap==='undefined'){",
    "  window.bootstrap={};",
    "}",
    "if(!bootstrap.Modal){",
    "  var _modalInstances=new WeakMap();",
    "  bootstrap.Modal=function(el){",
    "    var self=this;self._el=el;self._bk=null;",
    "    _modalInstances.set(el,self);",
    "    self.show=function(){",
    "      el.style.display='block';el.classList.add('show');el.setAttribute('aria-modal','true');",
    "      self._bk=document.createElement('div');",
    "      self._bk.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1040';",
    "      document.body.appendChild(self._bk);document.body.style.overflow='hidden';",
    "      self._bk.onclick=function(){self.hide()};",
    "    };",
    "    self.hide=function(){",
    "      el.style.display='none';el.classList.remove('show');el.removeAttribute('aria-modal');",
    "      if(self._bk){self._bk.remove();self._bk=null;}",
    "      document.body.style.overflow='';",
    "    };",
    "    self.dispose=function(){self.hide();_modalInstances.delete(el)};",
    "    self.toggle=function(){el.classList.contains('show')?self.hide():self.show()};",
    "  };",
    "  bootstrap.Modal.getInstance=function(el){return _modalInstances.get(el)||null};",
    "  bootstrap.Modal.getOrCreateInstance=function(el){return _modalInstances.get(el)||new bootstrap.Modal(el)};",
    "}",

    "console.log('[Katana] CDN fallback stubs checked/applied');",
    "if(window.__piTrace)window.__piTrace('stubs OK, tinycolor='+(typeof tinycolor)+', smartcrop='+(typeof smartcrop)+', Cropper='+(typeof Cropper)+', bootstrap.Modal='+(typeof bootstrap!=='undefined'&&typeof bootstrap.Modal));",
  ];
  return "<script>\n" + lines.join("\n") + "\n<" + "/script>";
}

/**
 * CSS override per rendere le modali di crop utilizzabili nell'iframe.
 * Riduce altezze, max-width e compatta il footer.
 */
function buildModalOptimizationCss(): string {
  return [
    "<style>",
    "/* Katana iframe modal optimization */",
    ".modal-dialog.modal-xl { max-width: min(95vw, 800px) !important; margin: 8px auto !important; }",
    ".modal-dialog-centered { min-height: auto !important; align-items: flex-start !important; padding-top: 8px; }",
    ".modal-content { max-height: calc(100vh - 16px) !important; overflow: hidden !important; }",
    ".modal-body { height: 50vh !important; min-height: 220px !important; overflow: hidden !important; position: relative !important; }",
    ".img-container { max-height: 100% !important; overflow: hidden !important; }",
    ".img-container > img:not(.cropper-hidden) { max-width: 100%; max-height: 100%; object-fit: contain; }",
    ".cropper-container { max-height: 100% !important; max-width: 100% !important; }",
    ".modal-header { padding: 10px 16px !important; }",
    ".modal-header .modal-title { font-size: 13px !important; }",
    ".modal-footer { padding: 8px 12px !important; gap: 6px !important; flex-wrap: wrap !important; }",
    ".modal-footer .d-flex { gap: 6px !important; }",
    ".modal-footer .form-range { width: 70px !important; }",
    ".modal-footer .badge { min-width: 45px !important; font-size: 10px !important; }",
    ".modal-footer .small { font-size: 10px !important; }",
    ".modal-footer .btn { padding: 6px 14px !important; font-size: 11px !important; }",
    "#modalZoomGroup { padding-left: 8px !important; }",
    "#modalCircleGroup { padding-left: 8px !important; margin-left: 8px !important; }",
    "/* Detect modal compact */",
    ".detect-dialog { max-width: min(90vw, 420px) !important; }",
    "</style>",
  ].join("\n");
}

/**
 * Combina i 4 file Katana in un unico documento HTML autonomo.
 *
 * @param mode "stable" = Katana pulita senza iniezioni sperimentali
 *             "dev"    = Katana con diagnostica + preview-inject FAB
 */
function buildFullHtml(mode: "stable" | "dev" = "stable"): string {
  let html = indexHtmlCode;

  // 1. Rimuovi CSP meta tag (blocca caricamento CDN nell'iframe)
  const cspIdx = html.indexOf("Content-Security-Policy");
  if (cspIdx !== -1) {
    const cspMetaStart = html.lastIndexOf("<meta", cspIdx);
    const cspMetaEnd = html.indexOf("/>", cspIdx);
    if (cspMetaStart !== -1 && cspMetaEnd !== -1) {
      html =
        html.substring(0, cspMetaStart) +
        "<!-- CSP removed for iframe -->" +
        html.substring(cspMetaEnd + 2);
    }
  }

  // 2. Rimuovi SRI integrity hash (falliscono su origin about:srcdoc)
  html = html.replace(/\s+integrity="[^"]*"/g, "");

  // 2.1 Rimuovi attributo crossorigin (non necessario senza SRI, può causare problemi in srcdoc)
  html = html.replace(/\s+crossorigin="[^"]*"/g, "");

  // 2.2 [DEV ONLY] Inietta script diagnostico subito dopo <body>
  if (mode === "dev") {
    const diagScript = `<script>
(function(){
  window.__PI_TRACE=[];
  window.__piTrace=function(msg){
    window.__PI_TRACE.push(msg);
    console.log('[Katana-Diag] '+msg);
    var p=document.getElementById('__piDiag');
    if(p)p.textContent=window.__PI_TRACE.join(' | ');
  };
  window.onerror=function(m,s,l){window.__piTrace('ERR:'+m+' @L'+l);return false};
  window.addEventListener('DOMContentLoaded',function(){
    var d=document.createElement('div');d.id='__piDiag';
    d.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:99999;padding:3px 8px;font:600 10px/1.2 monospace;color:#93c5fd;background:rgba(15,23,42,.92);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none';
    d.textContent=window.__PI_TRACE.join(' | ');
    document.body.appendChild(d);
    window.__piTrace('DOM ready');
  });
  window.__piTrace('diag-init');
})();
<` + `/script>`;
    html = html.replace("<body>", "<body>\n" + diagScript);
  }

  // 2.5 Inietta fallback stubs CDN PRIMA di data.js
  const fallbackScript = buildCdnFallbackScript();
  const dataTagSearch = 'src="data.js"';
  const dataTagIdx = html.indexOf(dataTagSearch);
  if (dataTagIdx !== -1) {
    const insertPos = html.lastIndexOf("<script", dataTagIdx);
    if (insertPos !== -1) {
      html =
        html.substring(0, insertPos) +
        fallbackScript +
        "\n" +
        html.substring(insertPos);
    }
  }

  // 3. style.css → inline (file locale, non disponibile via CDN)
  const cssIdx = html.indexOf('href="style.css"');
  if (cssIdx !== -1) {
    const linkStart = html.lastIndexOf("<link", cssIdx);
    const linkEnd = html.indexOf(">", cssIdx) + 1;
    if (linkStart !== -1 && linkEnd > 0) {
      html =
        html.substring(0, linkStart) +
        "<style>\n" + styleCssCode + "\n</style>" +
        html.substring(linkEnd);
    }
  }

  // 4. data.js → inline
  const dataIdx = html.indexOf('src="data.js"');
  if (dataIdx !== -1) {
    const scriptStart = html.lastIndexOf("<script", dataIdx);
    const closingTag = "</script>";
    const scriptEnd = html.indexOf(closingTag, dataIdx);
    if (scriptStart !== -1 && scriptEnd !== -1) {
      if (mode === "dev") {
        // Dev: script di tracing separati prima e dopo
        html =
          html.substring(0, scriptStart) +
          "<script>if(window.__piTrace)window.__piTrace('data.js start')<" + "/script>\n" +
          "<script>\n" + dataJsCode + "\n<" + "/script>\n" +
          "<script>if(window.__piTrace)window.__piTrace('data.js OK, SITE_CONFIG='+(typeof SITE_CONFIG))<" + "/script>" +
          html.substring(scriptEnd + closingTag.length);
      } else {
        // Stable: inline semplice
        html =
          html.substring(0, scriptStart) +
          "<script>\n" + dataJsCode + "\n<" + "/script>" +
          html.substring(scriptEnd + closingTag.length);
      }
    }
  }

  // 5. script.js → inline
  const jsIdx = html.indexOf('src="script.js');
  if (jsIdx !== -1) {
    const scriptStart = html.lastIndexOf("<script", jsIdx);
    const closingTag = "</script>";
    const scriptEnd = html.indexOf(closingTag, jsIdx);
    if (scriptStart !== -1 && scriptEnd !== -1) {
      if (mode === "dev") {
        html =
          html.substring(0, scriptStart) +
          "<script>if(window.__piTrace)window.__piTrace('script.js start')<" + "/script>\n" +
          "<script>\n" + scriptJsCode + "\n<" + "/script>\n" +
          "<script>if(window.__piTrace)window.__piTrace('script.js OK')<" + "/script>" +
          html.substring(scriptEnd + closingTag.length);
      } else {
        html =
          html.substring(0, scriptStart) +
          "<script>\n" + scriptJsCode + "\n<" + "/script>" +
          html.substring(scriptEnd + closingTag.length);
      }
    }
  }

  // 6. [DEV ONLY] Inietta preview-inject prima di </body>
  if (mode === "dev") {
    html = html.replace("</body>", previewInjectDevCode + "\n</body>");
  }
  // Note: STABLE mode = no preview-inject at all

  // 7. Inietta CSS override per le modali prima di </head>
  html = html.replace("</head>", buildModalOptimizationCss() + "\n</head>");

  return html;
}

/* ------------------------------------------------------------------ */
/* Public handle for parent to call reload / openNewTab                */
/* ------------------------------------------------------------------ */

export interface KatanaPreviewHandle {
  reload: () => void;
  openNewTab: () => void;
}

interface KatanaPreviewProps {
  mode: "stable" | "dev";
}

export const KatanaPreviewTab = forwardRef<KatanaPreviewHandle, KatanaPreviewProps>(
  function KatanaPreviewTab({ mode }, ref) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeKey, setIframeKey] = useState(0);

    const srcDoc = useMemo(() => buildFullHtml(mode), [mode]);

    useImperativeHandle(ref, () => ({
      reload: () => setIframeKey((k) => k + 1),
      openNewTab: () => {
        const blob = new Blob([srcDoc], { type: "text/html" });
        window.open(URL.createObjectURL(blob), "_blank");
      },
    }), [srcDoc]);

    return (
      <iframe
        key={iframeKey}
        ref={iframeRef}
        srcDoc={srcDoc}
        className="w-full h-full border-0 bg-white"
        sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms"
        title="Katana"
      />
    );
  }
);
