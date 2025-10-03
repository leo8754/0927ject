package com.example.AIdemo.controller;

import com.example.AIdemo.ResumeAnalysis;
import com.example.AIdemo.repository.ResumeAnalysisRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

//ollala import元件
import java.net.http.*;
import java.net.URI;
import java.nio.charset.StandardCharsets;


import java.util.List;
import java.io.IOException;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeAnalysisRepository resumeAnalysisRepository;

    @PostMapping("/analyze")
    public String analyzeResume(@RequestParam("userId") Long userId,
                                 @RequestParam("file") MultipartFile file) throws IOException {

        String resumeText = "";

        // 判斷副檔名
        String filename = file.getOriginalFilename();
        if (filename == null) {
            return "檔案名稱為空，無法解析";
        }

        if (filename.endsWith(".pdf")) {
            // 解析 PDF
            PDDocument document = PDDocument.load(file.getInputStream());
            PDFTextStripper stripper = new PDFTextStripper();
            resumeText = stripper.getText(document);
            document.close();
        } else if (filename.endsWith(".docx")) {
            // 解析 DOCX
            XWPFDocument docx = new XWPFDocument(file.getInputStream());
            XWPFWordExtractor extractor = new XWPFWordExtractor(docx);
            resumeText = extractor.getText();
            extractor.close();
        } else {
            return "不支援的檔案格式，請上傳 PDF 或 DOCX";
        }

        // TODO: 呼叫 Ollama 分析履歷
        int score = 80;
        String strengths = String.join("\n", List.of(
            "溝通能力佳",
            "具備領導力",
            "跨部門協作經驗"
        ));

        String weaknesses = String.join("\n", List.of(
            "履歷排版混亂",
            "缺乏量化成果",
            "技能描述過於籠統"
        ));

        // 儲存分析結果
        ResumeAnalysis analysis = new ResumeAnalysis();
        analysis.setUserId(userId);
        analysis.setScore(score);
        analysis.setStrengths(strengths);
        analysis.setWeaknesses(weaknesses);

        resumeAnalysisRepository.save(analysis);

        return "履歷分析完成，分數：" + score;
    }


        // 呼叫 Ollama API 的方法
    public String callOllama(String prompt) throws IOException, InterruptedException {
    String json = "{ \"model\": \"llama3\", \"prompt\": \"" + prompt.replace("\"", "\\\"") + "\" }";

    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("http://localhost:11434/api/generate"))
        .header("Content-Type", "application/json")
        .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
        .build();

    HttpClient client = HttpClient.newHttpClient();
    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

    return response.body(); // 你可以解析 JSON 拿到分析結果
}

}


