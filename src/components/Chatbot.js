import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        composerPlaceholder: "Chat with bot",
        botId: "92c51459-4aeb-4525-8ee1-9482567336f0",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "92c51459-4aeb-4525-8ee1-9482567336f0",
        theme: "prism",
      });
    };
  }, []);

  return <div id="webchat" />;
};

export default Chatbot;
