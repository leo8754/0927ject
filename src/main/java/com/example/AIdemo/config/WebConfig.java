package com.example.AIdemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 所有 API 路徑
                        .allowedOrigins("http://localhost:3000") // 允許前端來源
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 允許的 HTTP 方法
                        .allowedHeaders("*") // 允許所有 headers
                        .allowCredentials(true); // 允許帶 cookie

                        System.out.println("CORS 設定已啟用");
            }
        };
    }
}
