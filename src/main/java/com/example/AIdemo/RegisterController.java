package com.example.AIdemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class RegisterController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user/create-old")
    public ResponseEntity<?> register(@RequestBody User user) {

        // 【檢查 email 或 phone 是否重複】
        // 確保 UserRepository 中已定義 findByEmailOrPhone
        Optional<User> existingUser = userRepository.findByEmailOrPhone(req.email, req.phone);

        if (existingUser.isPresent()) {
            // 用戶已存在，構建詳細錯誤訊息
            String existingEmail = existingUser.get().getEmail();
            String existingPhone = existingUser.get().getPhone();
            
            String message;
            
            if (req.email.equals(existingEmail) && req.phone.equals(existingPhone)) {
                 message = "電子郵件和手機號碼都已被註冊。";
            } else if (req.email.equals(existingEmail)) {
                 // 用戶提供的 email 匹配到資料庫中的 email
                 message = "電子郵件 **" + req.email + "** 已被註冊。";
            } else if (req.phone.equals(existingPhone)) {
                 // 用戶提供的 phone 匹配到資料庫中的 phone
                 message = "手機號碼 **" + req.phone + "** 已被註冊。";
            } else {
                 // 這裡通常不會執行到，但作為備用錯誤處理
                 message = "用戶已存在，請檢查電子郵件或手機號碼。";
            }

            // 返回 HTTP 409 Conflict，告知客戶端資源衝突
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                Map.of("success", false, "message", message)
            );
        }

        // 【邏輯 2：執行註冊】
        User user = new User();
        user.setName(req.name);
        user.setEmail(req.email);
        user.setPassword(req.password); // ⚠️ 再次提醒：生產環境中請務必加密密碼！
        user.setPhone(req.phone);
        user.setSelectedPosition(req.selected_position);
        user.setEmailVerified(false);
        user.setRole("user");

        User savedUser = userRepository.save(user);

        // 【✅ 修正點】：統一成功響應格式為 Map<String, Object>
        return ResponseEntity.ok(
            Map.of("success", true, "message", "註冊成功！", "id", savedUser.getId().toString())
        );
    }
}