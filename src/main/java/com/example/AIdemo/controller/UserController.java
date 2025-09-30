package com.example.AIdemo.controller;

import com.example.AIdemo.User;
import com.example.AIdemo.UserRepository;
import com.example.AIdemo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/api/register")
    public String register(@RequestBody User user) {
        String code = UUID.randomUUID().toString();
        user.setEmailVerificationCode(code);
        user.setEmailVerified(false);
        userRepository.save(user);

        emailService.sendVerificationEmail(user.getEmail(), code);
        return "註冊成功，請查收驗證信";
    }

    @GetMapping("/api/verify")
    public String verifyEmail(@RequestParam("code") String code) {
        Optional<User> userOpt = userRepository.findByEmailVerificationCode(code);
        if (userOpt.isEmpty()) {
            return "驗證碼錯誤或已失效";
        }

        User user = userOpt.get();
        user.setEmailVerified(true);
        user.setEmailVerificationCode(null);
        userRepository.save(user);

        return "Email 驗證成功！";
    }
}
