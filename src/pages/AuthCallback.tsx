import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // HTTP 요청을 위한 axios

const AuthCallback: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code"); // Google에서 받은 authorization code
        const error = urlParams.get("error");

        if (error) {
            console.error("OAuth Error:", error);
            alert("Login failed. Please try again.");
            navigate("/");
            return;
        }

        if (code) {
            // API 호출: code를 백엔드로 전달하여 JWT 발급 요청
            axios
                .post("/auth/login", { code })
                .then((response) => {
                    console.log("JWT Response:", response.data);
                    const { accessToken } = response.data;

                    // JWT를 로컬 스토리지 또는 쿠키에 저장
                    localStorage.setItem("accessToken", accessToken);

                    // 인증 성공 후 홈으로 리디렉션
                    alert("Login successful!");
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Error logging in:", error);
                    alert("Login failed. Please try again.");
                    navigate("/");
                });
        } else {
            console.error("No authorization code found.");
            alert("Login failed. Please try again.");
            navigate("/");
        }
    }, [navigate]);

    return (
        <div>
            <h1>Processing Login...</h1>
        </div>
    );
};

export default AuthCallback;
