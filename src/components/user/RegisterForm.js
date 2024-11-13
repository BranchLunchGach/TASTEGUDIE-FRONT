import React from 'react';
import './RegisterForm.css';

const RegisterForm = () => {

    // 현재 연도 계산
    const currentYear = new Date().getFullYear();

    // 1960년부터 현재 연도까지의 옵션을 생성하는 함수
    const generateYearOptions = () => {
        const years = [];
        for (let year = 1960; year <= currentYear; year++) {
            years.push(<option key={year} value={year}>{year}</option>);
        }
        return years;
    };

    return (
        <div className='container'>
            <h2 className='register-title'>Sign-UP</h2>

            <p className='register-info'>회원가입을 위해 정보를 입력해주세요.</p>

            <div className='register-container'>
                <div className='register-sub-container'>
                    <p>*는 필수입력 사항입니다.</p>

                    <form className='register-form'> 
                        <label>
                            <span>*이름</span>
                            <input type='text' id="name" name="name" placeholder='홍길동'/>
                        </label>

                        <label>
                            <span>*아이디</span>
                            <input type='text' id="userId" name="userId" placeholder='이메일 형식으로 입력'/>
                        </label>

                        <label>
                            <span>*비밀번호</span>
                            <input type='password' id="password" name="password" placeholder='비밀번호'/>
                        </label>

                        <label>
                            <span>*비밀번호 확인</span>
                            <input type='password' id="password2" name="password2" placeholder='비밀번호 확인'/>
                        </label>

                        <label>
                            <span>전화번호</span>
                            <input type='text' id="phone" name="phone" placeholder='숫자만 입력' />
                        </label>

                        <label>
                            <span>생년월일</span>
                            <div class="date-select-container">
                                <select class="date-select" id="year" name="birthDate">
                                    <option>년(4자)</option>
                                    {generateYearOptions()}
                                </select>
                                
                                <select class="date-select" id="month" name="birthDate">
                                    <option>월</option>
                                    {[...Array(12).keys()].map(month => (
                                        <option key={month + 1} value={month + 1}>
                                            {month + 1}
                                        </option>
                                    ))}
                                </select>
                                
                                <select class="date-select" id="day" name="birthDate">
                                    <option>일</option>
                                    {[...Array(31).keys()].map(day => (
                                        <option key={day + 1} value={day + 1}>
                                            {day + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </label>

                        <label>
                            <span>성별</span>
                            <div class="gender-toggle">
                                <input type="radio" id="male" name="gender" value="male" checke/>
                                <label for="male">남</label>
                                
                                <input type="radio" id="female" name="gender" value="female"/>
                                <label for="female">여</label>
                            </div>
                        </label>

                        <button type='submit' id="register-button">회원가입</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;