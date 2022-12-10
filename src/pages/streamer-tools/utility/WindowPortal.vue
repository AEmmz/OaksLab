<template>
   <div v-if="isOpen">
      <slot/>
   </div>
</template>

<script lang="ts">
//Imports
import { defineComponent } from "vue";

function copyStyles(sourceDoc: Document, targetDoc: Document) {
   Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
      if (styleSheet.cssRules) {
         // for <style> elements
         const newStyleEl = sourceDoc.createElement("style");

         Array.from(styleSheet.cssRules).forEach(cssRule => {
            // write the text of each rule into the body of the style element
            newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
         });

         targetDoc.head.appendChild(newStyleEl);
      } else if (styleSheet.href) {
         // for <link> elements loading CSS from a URL
         const newLinkEl = sourceDoc.createElement("link");

         newLinkEl.rel = "stylesheet";
         newLinkEl.href = styleSheet.href;
         targetDoc.head.appendChild(newLinkEl);
      }
   });
}

type WindowPortalState = {
   windowRef: Window | null
}

export default defineComponent({
   name: "window-portal",
   model: {
      prop: "open",
      event: "close"
   },
   props: {
      isOpen: {
         type: Boolean,
         default: false
      }
   },
   mounted() {
      if (this.isOpen) {
         this.openPortal();
      }
   },
   beforeUnmount() {
      if (this.windowRef) {
         this.closePortal();
      }
   },
   data(): WindowPortalState {
      return {
         windowRef: null
      };
   },
   watch: {
      isOpen(newOpen) {
         if (newOpen) {
            this.openPortal();
         } else {
            this.closePortal();
         }
      }
   },
   methods: {
      openPortal() {
         this.windowRef = window.open("", "", "width=600,height=400,left=200,top=200");
         if (this.windowRef) {
            this.windowRef.document.body.appendChild(this.$el);
            copyStyles(window.document, this.windowRef.document);
            this.windowRef.addEventListener("beforeunload", this.closePortal.bind(this));
         }
      },
      closePortal() {
         if (this.windowRef) {
            this.windowRef.close();
            this.windowRef = null;
            this.$emit("close");
         }
      }
   }
});
</script>
