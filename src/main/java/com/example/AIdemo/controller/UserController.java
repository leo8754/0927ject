package com.example.AIdemo.controller;

import com.example.AIdemo.User;
import com.example.AIdemo.UserRepository;
import com.example.AIdemo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;



import java.util.Optional;
import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;


    //email驗證邏輯
    @PostMapping("/api/register")
    public String register(@RequestBody User user) {
    Optional<User> existing = userRepository.findByEmail(user.getEmail());
    if (existing.isEmpty()) {
        return "請先發送驗證碼";
    }

    User dbUser = existing.get();

    // ✅ 驗證碼比對（null 安全）
    String inputCode = user.getEmailVerificationCode();
    String storedCode = dbUser.getEmailVerificationCode();
    if (inputCode == null || storedCode == null || !inputCode.equals(storedCode)) {
        return "驗證碼錯誤";
    }
    // ✅ 防止重複註冊
    if (dbUser.isEmailVerified()) {
        return "此 Email 已完成註冊";
    }

    // ✅ 通過驗證 → 儲存資料
    dbUser.setName(user.getName());
    dbUser.setPassword(user.getPassword());
    dbUser.setPhone(user.getPhone());
    dbUser.setSelectedPosition(user.getSelectedPosition());
    dbUser.setEmailVerified(true);
    dbUser.setEmailVerificationCode(null); // ✅ 清空驗證碼
    userRepository.save(dbUser);

    return "註冊成功";
}




@PostMapping("/api/send-verification-code")
public String sendVerificationCode(@RequestBody Map<String, String> payload) {
    String email = payload.get("email");
    String code = String.valueOf((int)(Math.random() * 900000) + 100000); // 6 位數

    Optional<User> existing = userRepository.findByEmail(email);
    User user;

    if (existing.isPresent()) {
        user = existing.get();
    } else {
        user = new User();
        user.setEmail(email);
        user.setEmailVerified(false);
    }

    user.setEmailVerificationCode(code);
    userRepository.save(user);
    emailService.sendVerificationEmail(email, code);

    return "驗證碼已寄出";
}


}
