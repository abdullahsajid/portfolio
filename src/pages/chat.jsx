import Input from "../components/input";
import useUserStore from "../state/user";
import { chatApi } from "../services/user-service";
import { generateUnixTimestampId } from "../utils/CommonUtils";
const Chat = () => {
    const { user, chat, setUser,updateChat, setChat,value, setValue,setIsLoading,setChatLimit } = useUserStore();

  const handleSubmit = async (promptValue) => {
    let userId = localStorage.getItem("portfolio-userId");
    let requestCount = localStorage.getItem("portfolio-requestCount");
    let prompt = promptValue ?? value;
    if (prompt.trim() === "") return;
    try {
      if (!prompt.trim()) {
        // toast.error("Please enter a prompt");
        return;
      }
      if (!userId) {
        userId = generateUnixTimestampId();
      }
      if (Number(requestCount) >= 2) {
        setChatLimit(true);
        return;
      }
      const formData = new FormData();
      formData.append("prompt", prompt);
    //   if (uploadedImage) {
    //     formData.append("image", uploadedImage);
    //   }
      setChat({
        id: chat.length + 1,
        type: "user",
        text: prompt,
        // image: inputImagePreview,
      });
      let getId = chat.length + 2;
      setChat({
        id: getId,
        type: "agent",
        text: "",
        isThinking: true,
      });
      setValue("");

      const response = await chatApi(formData);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let accumulatedResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data:")) {
            try {
              const jsonData = JSON.parse(line.substring(6));

              if (jsonData?.content) {
                const textValue = jsonData.content;
                accumulatedResponse += textValue;
                updateChat(getId, textValue, false);
                // setInputImagePreview(null);
              }
            } catch (parseError) {
              setIsLoading(false);
              console.error("Error parsing JSON:", parseError);
              setValue("");
            //   setInputImagePreview(null);
            //   setUploadedImage(null);
            }
          }
        }
      }
      setIsLoading(false);
      localStorage.setItem("stem-userId", String(userId));
      localStorage.setItem(
        "stem-requestCount",
        String(Number(requestCount) + 1)
      );
    } catch (error) {
      setIsLoading(false);
    //   toast.error("Please Try again");
      setValue("");
    } finally {
      setIsLoading(false);
    }
  };

    return (
        <div className="bg-[#111] flex flex-col px-8 max-sm:px-5 max-sm:pl-4 pt-24 gap-5 h-screen text-white">
            <h1>Chat Page</h1>
            <p>This is the chat page content.</p>
            <div className="flex-1 overflow-y-auto">
                {chat.map((message) => (
                    <div key={message.id} className={`chat-message ${message.type}`}>
                        <p className="text-white">{message.text}</p>
                        {message.isThinking && <span className="text-white">Thinking...</span>}
                    </div>
                ))}
            </div>
            <div className="fixed bottom-0 w-full">
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Type your message here"
                    onSubmit={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default Chat;