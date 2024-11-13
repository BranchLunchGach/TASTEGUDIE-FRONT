import React from 'react';
import styled from 'styled-components';

const Title = styled.h3`
  text-align: center;
  font-size: 1.4vw;
  color: red;
  margin-bottom: 1vw;
  margin-top: 2vw;
  margin-bottom: 4vw;
`;

const ALink = styled.a`
    text-decoration: none;
    color: black;
    pointer-events: none;
`

const Copy = styled.div`
    max-height: 25vw;
    overflow-y: scroll;
    -ms-overflow-style: none;

    &::-webkit-scrollbar{
        display:none;
    }

`

const CopyRight = () => {
    
    return (
        <div>
            <Title>주의사항!!!</Title>
            <Copy>
                아이콘 출처<br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="먹다 아이콘">먹다 아이콘 제작자: Freepik - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="반합 아이콘">반합 아이콘 제작자: Three musketeers - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/-" title="밥 그릇 아이콘">밥 그릇 아이콘 제작자: kosonicon - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="파스타 아이콘">파스타 아이콘 제작자: Smashicons - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="회 아이콘">회 아이콘 제작자: RIkas Dzihab - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="자장면 아이콘">자장면 아이콘 제작자: Nhor Phai - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="국수 아이콘">국수 아이콘 제작자: mangsaabguru - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="새우 아이콘">새우 아이콘 제작자: Vectorslab - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="두부조림 아이콘">두부조림 아이콘 제작자: Freepik - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/-" title="한국 음식 아이콘">한국 음식 아이콘 제작자: Freepik - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="한국어 아이콘">한국어 아이콘 제작자: Freepik - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="샐러드 아이콘">샐러드 아이콘 제작자: Freepik - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="핫도그 아이콘">핫도그 아이콘 제작자: Freepik - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="떡볶이 아이콘">떡볶이 아이콘 제작자: Kise1ki - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="오니기리 아이콘">오니기리 아이콘 제작자: Mihimihi - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="라면 아이콘">라면 아이콘 제작자: justicon - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="해장국 아이콘">해장국 아이콘 제작자: Freepik - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="고기 아이콘">고기 아이콘 제작자: Freepik - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="빵 아이콘">빵 아이콘 제작자: Salooj - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="피자 아이콘">피자 아이콘 제작자: Konkapp - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="포도주 아이콘">포도주 아이콘 제작자: cah nggunung - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="수프 아이콘">수프 아이콘 제작자: IconBaandar - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="볶음밥 아이콘">볶음밥 아이콘 제작자: Freepik - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="가족 아이콘">가족 아이콘 제작자: Eucalyp - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="다수 아이콘">다수 아이콘 제작자: Three musketeers - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="데이트 아이콘">데이트 아이콘 제작자: Freepik - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="금고 아이콘">금고 아이콘 제작자: Andy Horvath - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="개인 아이콘">개인 아이콘 제작자: Good Ware - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="지방 아이콘">지방 아이콘 제작자: Freepik - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="현지 아이콘">현지 아이콘 제작자: Freepik - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="포도주 아이콘">포도주 아이콘 제작자: Freepik - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/-" title="차량 주차 아이콘">차량 주차 아이콘 제작자: PIXARTIST - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/" title="비건 아이콘">비건 아이콘 제작자: Freepik - Flaticon</ALink><br/>
                <ALink href="https://www.flaticon.com/kr/free-icons/-" title="반려 동물 친화적 아이콘">반려 동물 친화적 아이콘 제작자: Maan Icons - Flaticon</ALink>
            </Copy>
        </div>
    );
};

export default CopyRight;