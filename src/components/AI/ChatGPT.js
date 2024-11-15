// import OpenAI from "openai";
// import { useState } from "react";

// export const Chat = async (message) =>{
//   console.log(">>callGPT");
//   const [menus, setMenus] = useState([]);
  
//   const [menu, setMenu] = useState({
//       menuName:"",
//       reason:[],
//       imgUrl:""
//   });


//   const response = await fetch("https://api.openai.com/v1/chat/completions",{
//     method: "POST",
//     headers: {
//       "Content-Type": " application/json",
//       Authorization: `Bearer ${process.env.REACT_APP_GPT_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [
//         { role: "system", content: "Respond only in JSON format without any additional explanation or text." },
//         //식당에서 메인으로 먹을 수 있는 메뉴를 양식,한식,중식이거나 면류,밥류중에 하나에서 고르고 싶어 든든한 음식이면 좋겠어 JSON형식으로 메뉴를 2개 추천해줘 KEY는 menuName, reason, imgUrl이야 reason에는 이 음식을 추천하는 이유를 3가지 적어줘
//         {role: "user", content: "식당에서 메인으로 먹을 수 있는 메뉴를 " + message + " JSON형식으로 메뉴를 2개 추천해줘 KEY는 menuName, reason, imgUrl이야 reason에는 이 음식을 추천하는 이유를 3가지 적어줘 "},
//       ],
//       temperature: 0.7,
//     }),
//   });

//   const responseData = await response.json();
//   console.log("responseData", responseData);
//   let content = responseData.choices[0].message.content.trim();
//   try {
//     // 추가 텍스트가 있을 경우 JSON 부분만 추출
//     if (!content.startsWith("[")) {
//       const jsonStartIndex = content.indexOf("[");
//       const jsonEndIndex = content.lastIndexOf("]");
//       content = content.substring(jsonStartIndex, jsonEndIndex + 1);
//     }
//     // JSON 파싱
//     const jsonResponse = JSON.parse(content);
//     console.log(jsonResponse);
//     setMenus(jsonResponse);
//     menus.map((menuRes)=>{
//       console.log(menuRes.menuName);
//       setMenu(menuRes);
//       imgAi(menuRes.menuName);
//       return menu.imgUrl;
//     })
//     return menus;
//   } catch (error) {
//     console.error("Failed to parse JSON:", error);
//     throw new Error("Invalid JSON response from API");
//   }

//   async function imgAi(menuName) {
//     const openai = new OpenAI();
//     const imgResponse = await openai.images.generate({
//       model: "dall-e-3",
//       prompt: menuName,
//       n: 1,
//       size: "1024x1024",
//     });
//     const image_url = imgResponse.data[0].url;
//     console.log(image_url);
//     setMenus(...menus, {...menu, imgUrl:image_url});
//   }
// }


// Utility function for making API requests to OpenAI and parsing JSON
export const ChatGPT = async (message) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_GPT_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Respond only in JSON format without any additional explanation or text." },
          {
            role: "user",
            content: `식당에서 메인으로 먹을 수 있는 메뉴를 ${message} JSON형식으로 메뉴를 2개 추천해줘 KEY는 menuName, reason, imgUrl이야 reason에는 이 음식을 추천하는 이유를 3가지 적어줘`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const responseData = await response.json();
    let content = responseData.choices[0].message.content.trim();

    // Extract JSON if additional text is present
    if (!content.startsWith("[")) {
      const jsonStartIndex = content.indexOf("[");
      const jsonEndIndex = content.lastIndexOf("]");
      content = content.substring(jsonStartIndex, jsonEndIndex + 1);
    }

    const menus = JSON.parse(content);

    //Fetch images for each menu item
    // const menusWithImages = await Promise.all(
    //   menus.map(async (menu) => {
    //     const image_url = await generateImage(menu.menuName);
    //     return { ...menu, imgUrl: image_url };
    //   })
    // );

    console.log(menus)

    return menus;
  } catch (error) {
    console.error("Failed to fetch or parse menu recommendations:", error);
    throw new Error("Failed to get menu recommendations");
  }
};

//Utility function to generate image for a given menu name
// const generateImage = async (menuName) => {
//   try {
//     const response = await fetch("https://api.openai.com/v1/images/generations", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.REACT_APP_GPT_API_KEY}`,
//       },
//       body: JSON.stringify({
//         prompt: menuName,
//         model:"dall-e-3",
//         n: 1,
//         size: "1024x1024",
//       }),
//     });

//     const imgData = await response.json();
//     return imgData.data[0].url;
//   } catch (error) {
//     console.error("Failed to generate image:", error);
//     throw new Error("Image generation failed");
//   }
// };

export const isMenu = async (firstMenu, secMenu, message) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_GPT_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Respond only in JSON format without any additional explanation or text." },
          {
            role: "user",
            content: `이전에 응답 받은 값이 ${firstMenu}와 ${secMenu}이고 ${message}라는 입력을 했을 때 어떤 값을 의미하는 거 같아? 둘 중에 가장 유사한 값만 보여줘. json형식으로 보여줘. 만약 값 중에 의미하는 게 없으면 없음을 보여줘. key는 select야`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
    let content = responseData.choices[0].message.content.trim();

    // 불필요한 마크업 제거: ```json...``` 형태의 텍스트를 처리
    content = content.replace(/^```json\s*|\s*```$/g, '').trim(); // ````json`과 ` ``` ` 제거


    // 이미 올바른 JSON 형식이라면 바로 반환
    try {
      // JSON 파싱 없이 바로 객체를 반환
      const menus = JSON.parse(content); // 만약 content가 JSON 객체라면, 바로 파싱
      console.log(menus);
      return menus;
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      return { select: "없음" }; // 파싱 실패 시 기본값 반환
    }
  } catch (error) {
    console.error("Failed to fetch or parse menu recommendations:", error);
    throw new Error("Failed to get menu recommendations");
  }
};