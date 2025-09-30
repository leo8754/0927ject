package com.example.AIdemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String code) {
        String verifyUrl = "http://localhost:8080/api/verify?code=" + code;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("感謝您使用 欸! 愛履歷,請驗證你的 Email");
        message.setText("請點擊以下連結完成驗證：\n" + verifyUrl);

        mailSender.send(message);
    }
}
