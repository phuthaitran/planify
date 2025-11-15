import { useState } from "react";
import "./App.css";

export default function SignInPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setError("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        setError("");
        alert(`Đăng nhập thành công!\nUsername: ${username}\nEmail: ${email}`);
    };

    return (
        <div className="signin-container">
            <form className="signin-box" onSubmit={handleSubmit}>
                <h2>Đăng nhập</h2>

                <label>Tên người dùng</label>
                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Email</label>
                <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Mật khẩu</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="error">{error}</p>}

                <button type="submit">Đăng nhập</button>

                <p className="signup-text">
                    Chưa có tài khoản? <a href="/signup">Đăng ký</a>
                </p>
            </form>
        </div>
    );
}

