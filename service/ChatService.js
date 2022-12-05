import ChatResponse from "./ChatResponse.json";

const user = { _id: 100 };

const chat = async (caseType, stage, messages = []) => {
   if (caseType.current === -1) return initChat(caseType);
   if (caseType.current === 0) return submitChatType(caseType, stage, messages);
   if (caseType.current === 1) return chatCase1(stage, messages);
   return [];
};

const initChat = async (caseType) => {
   console.log(ChatResponse.initChats);
   const randNo = Math.floor(Math.random() * 10000);
   caseType.current = 0;
   await sleep(500);
   return ChatResponse.initChats
      .map((text, index) => ({
         _id: randNo + index,
         text,
         createdAt: new Date(),
         user,
      }))
      .reverse();
};

const submitChatType = async (caseType, stage, messages) => {
   const messageText = messages?.[0]?.text;
   const chatType = parseInt(messageText);
   await sleep(500);
   if (!chatType || chatType > 5 || chatType < 1)
      return [
         {
            _id: Math.floor(Math.random() * 10000),
            text: "Enter valid input",
            createdAt: new Date(),
            user,
         },
      ];

   caseType.current = chatType;
   stage.current = 0;
   return chat(caseType, stage, messages);
};

const chatCase1 = (stage, messages) => {
   if (stage.current === 0) {
      stage.current++;
      return [
         {
            _id: Math.floor(Math.random() * 10000),
            text: "Upload file",
            createdAt: new Date(),
            user,
         },
      ];
   }
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default {
   chat,
};
