const questions = [
    {
        question: "Q1. Indian and Uzbekistan have signed a Memorandum of Understanding in which of the following areas?",
        options: ["Military Medicine", "Military Education", "Military Training", "All of the above"],
        correct: "D. All of the above",
        explanation: "India and Uzbekistan signed agreements to collaborate on multiple aspects of military, including medicine, education, and training, to strengthen defense ties."
    },
    {
        question: "Q2. With which among the following group of countries is India presently negotiating the Bilateral Trade and Investment Agreement (BTIA)?",
        options: ["ASEAN", "GCC", "EU", "MERCOSUR"],
        correct: "C. EU",
        explanation: "The BTIA negotiations are focused on improving trade relations between India and the European Union by addressing barriers and expanding market access."
    },
    {
        question: "Q3. Which of the following countries are 'Free Trade Partners' of ASEAN?",
        options: ["1, 2, 4, and 5 only", "3, 4, 5, and 6 only", "1, 3, 4, and 5 only", "2, 3, 4, and 6 only"],
        correct: "C. 1, 3, 4, and 5 only",
        explanation: "Australia, China, India, and Japan maintain free trade agreements with ASEAN, strengthening regional trade integration."
    },
    {
        question: "Q4. Which of the following countries was not a founding member of BRICS?",
        options: ["India", "China", "South Africa", "Brazil"],
        correct: "C. South Africa",
        explanation: "BRICS was initially formed by Brazil, Russia, India, and China (BRIC). South Africa joined later, transforming it into BRICS."
    },
    {
        question: "Q5. India is not a member of which of the following groupings?",
        options: ["BRICS", "SCO", "G-7", "G-20"],
        correct: "C. G-7",
        explanation: "India is a member of BRICS, SCO, and G-20, but not of the G-7, which is a group of major advanced economies."
    },
    {
        question: "Q6. Consider the following statements regarding BRICS:\n1. It is an informal group of states.\n2. The sixth summit produced an agreement on the New Development Bank.\n3. The eighth summit of BRICS was held in Goa.\nWhich of the statements given above is/are correct?",
        options: ["1 only", "1 and 2 only", "2 and 3 only", "1, 2, and 3"],
        correct: "D. 1, 2, and 3",
        explanation: "BRICS is an informal group, with significant outcomes like the New Development Bank in the 6th summit. India hosted the 8th summit in Goa."
    },
    {
        question: "Q7. Which of the following foundational agreements have been signed between India and the USA?",
        options: ["BECA", "COMCASA", "GSOMIA", "All of the above"],
        correct: "D. All of the above",
        explanation: "BECA, COMCASA, and GSOMIA enhance India-USA defense cooperation, ensuring better intelligence sharing and strategic alignment."
    },
    {
        question: "Q8. Which of the following is/are the Principal Judicial Organ of the United Nations?",
        options: ["International Criminal Court", "International Court of Justice", "Both 1 and 2", "Neither 1 nor 2"],
        correct: "B. International Court of Justice",
        explanation: "The ICJ, based in The Hague, is the primary judicial organ of the UN, handling disputes between states and advising on legal matters."
    },
    {
        question: "Q9. Consider the following statements about the International Criminal Court (ICC):\n1. ICC was established through the Rome Statute.\n2. India has ratified the Rome Statute and is a member state of ICC.\n3. The UNSC may refer acts of aggression for investigation to ICC as per the UN Charter.\nWhich of the statements given above is/are correct?",
        options: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "None of the above"],
        correct: "B. 1 and 3 only",
        explanation: "India has not ratified the Rome Statute. However, the ICC investigates crimes of aggression referred by the UNSC, and it was established via the Rome Statute."
    },
    {
        question: "Q10. Consider the following statements about the Outer Space Treaty, 1967:\n1. It bans all kinds of military activity in space.\n2. India is a party to the treaty.\nWhich of the statements given above is/are correct?",
        options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
        correct: "B. 2 only",
        explanation: "The Outer Space Treaty prohibits weapons of mass destruction in space but permits peaceful military uses. India is a signatory."
    },
    {
        question: "Q11. Which of the following are members of the Eurasian Economic Union?",
        options: ["1, 3, 4, and 5 only", "2, 3, 4, and 5 only", "1, 4, and 5 only", "1, 2, 3, 4, and 5"],
        correct: "A. 1, 3, 4, and 5 only",
        explanation: "Kyrgyzstan, Armenia, Russia, and Belarus are members of the Eurasian Economic Union, enhancing economic cooperation."
    },
    {
        question: "Q12. Which of the following statements is/are correct about the United States Commission on International Religious Freedom?",
        options: ["It is a U.S. federal government commission.", "Its principal responsibility is to review international religious freedom violations.", "It makes policy recommendations to the President only.", "None of the above"],
        correct: "B. 1 and 2 only",
        explanation: "The USCIRF monitors global religious freedoms and provides policy recommendations to the U.S. President and Congress."
    },
    {
        question: "Q13. Currently, India is not part of which of the following?",
        options: ["ASEAN", "RCEP", "QUAD", "NATO"],
        correct: "D. NATO",
        explanation: "India participates in QUAD and is excluded from ASEAN and RCEP. NATO, being a transatlantic alliance, does not include India."
    },
    {
        question: "Q14. Consider the following statements related to the International Convention on Civil Aviation (ICAO):\n1. It does not allow any country to shoot down civilian aircraft under any circumstances.\n2. It designates the ICAO to investigate attacks on civilian aircraft.\nWhich of the statements given above is/are correct?",
        options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
        correct: "B. 2 only",
        explanation: "The ICAO investigates civilian aircraft incidents, but international law may allow interception under certain extreme circumstances."
    },
    {
        question: "Q15. Consider the following statements related to the Generalized System of Preferences (GSP) adopted by the U.S.:\n1. It allows duty-free import of certain goods into the U.S. to promote economic growth in poor and developing economies.\n2. The GSP is considered an exception to the Most Favored Nation (MFN) Principle.\nWhich of the statements given above is/are correct?",
        options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
        correct: "C. Both 1 and 2",
        explanation: "The GSP promotes trade benefits for developing economies and operates as an exception to WTO's MFN principle."
    },
    {
        question: "Q16. Which among the following countries are the members of the Shanghai Cooperation Organisation (SCO)?",
        options: ["Azerbaijan and Kazakhstan", "Kazakhstan and Belarus", "Kazakhstan and Tajikistan", "None of the above"],
        correct: "C. Kazakhstan and Tajikistan",
        explanation: "Kazakhstan and Tajikistan are SCO members, whereas Azerbaijan and Belarus are not full members."
    },
    {
        question: "Q17. 'Blue Dot Network' that is often seen in the news is related to which of the following?",
        options: ["A dark web network", "Malware that affected ISRO", "An international infrastructure rating mechanism", "A network of drug traffickers"],
        correct: "C. An international infrastructure rating mechanism",
        explanation: "The Blue Dot Network aims to certify high-quality infrastructure projects globally, enhancing transparency and sustainability."
    },
    {
        question: "Q18. Consider the following statements about the International Court of Justice (ICJ):\n1. The ICJ has been established under the Rome Statute.\n2. Its seat is at the Peace Palace in New York.\n3. The Court comprises 15 judges elected by the UNGA and UNSC.\nWhich of the statements given above is/are correct?",
        options: ["1 and 2 only", "2 only", "2 and 3 only", "3 only"],
        correct: "D. 3 only",
        explanation: "The ICJ, established under the UN Charter, is based in The Hague and comprises 15 judges elected by the UNGA and UNSC."
    },
    {
        question: "Q19. Consider the following statements with respect to BRICS institutions:\n1. Contingent Reserve Arrangement tackles BOP crises.\n2. The New Development Bank accords veto power to China and India only.\nWhich of the statements given above is/are correct?",
        options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
        correct: "A. 1 only",
        explanation: "While the Contingent Reserve Arrangement addresses BOP crises, veto powers are not exclusive to China and India in the NDB."
    },
    {
        question: "Q20. Consider the following statements about the International Criminal Court (ICC):\n1. It investigates crimes of genocide, war crimes, and crimes of aggression.\n2. Cases can be referred to the ICC by the UNSC.\nWhich of the statements given above is/are correct?",
        options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
        correct: "C. Both 1 and 2",
        explanation: "The ICC addresses grave crimes and can receive referrals from the UNSC for cases involving international aggression."
    },
    {
        question: "Q21. The term 'Two-State Solution' is sometimes mentioned in the news in the context of the affairs of:",
        options: ["China", "Israel", "Iraq", "Yemen"],
        correct: "B. Israel",
        explanation: "The Two-State Solution refers to resolving the Israeli-Palestinian conflict by establishing Israel and Palestine as two sovereign states."
    },
    {
        question: "Q22. With reference to the Oslo Accord of 1993, consider the following statements:\n1. It was an accord between Israel and Palestine.\n2. It resolved the Jerusalem problem by dividing the city into two parts.\nWhich of the statements given above is/are correct?",
        options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
        correct: "A. 1 only",
        explanation: "The Oslo Accord initiated a framework for peace between Israel and Palestine but did not resolve the Jerusalem issue."
    },
    {
        question: "Q23. Recently, the term 'Six-Day War' was in the news. It pertains to a fight between:",
        options: ["Vietnam – USA", "Arab – Israel", "Pakistan – Bangladesh", "Iran – Iraq"],
        correct: "B. Arab – Israel",
        explanation: "The Six-Day War of 1967 was fought between Israel and neighboring Arab nations, leading to significant territorial changes."
    },
    {
        question: "Q24. 'Varuna' is a joint naval exercise between which of the following?",
        options: ["India-Australia", "India-France", "India-USA", "India-UK"],
        correct: "B. India-France",
        explanation: "Varuna is a naval exercise between India and France, aimed at enhancing maritime cooperation and interoperability."
    },
    {
        question: "Q25. Resolution 1267 of the United Nations Security Council pertains to:",
        options: ["International Aviation", "Pharmaceutical Industry", "Child Labour", "Imposing sanctions on terrorist organizations"],
        correct: "D. Imposing sanctions on terrorist organizations",
        explanation: "UNSC Resolution 1267 establishes a sanctions regime targeting individuals and entities linked to terrorism, including Al-Qaeda."
    },
        {
            question: "Q26. Which of the following is/are correctly matched?\n1. Zayed Medal – Saudi Arabia\n2. Order of St. Andrew – France\nSelect the correct answer:",
            options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
            correct: "D. Neither 1 nor 2",
            explanation: "The Zayed Medal is awarded by the UAE, and the Order of St. Andrew is conferred by Russia. Both were incorrectly matched."
        },
        {
            question: "Q27. Which of the following is/are correctly matched?\nRegion mentioned in news – Community in relation:\n1. Rojava – Iraqi Kurds\n2. Mount Sinjar – Yazidi Group\n3. Sa'dah – Houthis\n4. Golan Heights – Hazaras\nSelect the correct answer:",
            options: ["1 and 2", "2, 3 and 4", "1, 3 and 4", "2 and 3"],
            correct: "D. 2 and 3",
            explanation: "Mount Sinjar is associated with Yazidis, and Sa'dah with Houthis in Yemen. Rojava relates to Syrian Kurds, not Iraq."
        },
        {
            question: "Q28. With reference to the WTO Ministerial Conference, consider the following statements:\n1. It is the topmost decision-making body of the WTO.\n2. It can take decisions on all matters under any of the multilateral trade agreements.\nWhich of the statements given above is/are correct?",
            options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
            correct: "C. Both 1 and 2",
            explanation: "The WTO Ministerial Conference is its highest decision-making body, empowered to make decisions on all trade agreements."
        },
        {
            question: "Q29. 'Loya Jirga' sometimes appears in the news. It is:",
            options: ["A mountain range in Rajasthan", "A tribal dance in northeast India", "An assembly of elders in Afghanistan", "Traditional wall painting"],
            correct: "C. An assembly of elders in Afghanistan",
            explanation: "Loya Jirga is a grand assembly of tribal elders and leaders in Afghanistan, used for political decision-making."
        },
        {
            question: "Q30. With reference to the Global Terrorism Index, consider the following statements:\n1. It is provided by the Institute for Economics & Peace.\n2. It relies on data from the Global Terrorism Database.\n3. It only includes terrorist acts conducted by non-state actors.\nWhich of the statements given above are correct?",
            options: ["1 and 2", "2 and 3", "1 and 3", "1, 2 and 3"],
            correct: "D. 1, 2 and 3",
            explanation: "The Global Terrorism Index, prepared by the Institute for Economics & Peace, uses the Global Terrorism Database and excludes state terrorism."
        },
        {
            question: "Q31. Which of the following are participants in the UN Global Counter-Terrorism Coordination Compact?",
            options: ["1. UN Secretary-General", "2. INTERPOL", "3. World Customs Organisation", "All of the above"],
            correct: "D. All of the above",
            explanation: "The UN Global Counter-Terrorism Coordination Compact includes entities like INTERPOL and the World Customs Organisation under the Secretary-General."
        },
        {
            question: "Q32. 'Christchurch Call to Action' is associated with:",
            options: ["Eliminating plastic pollution in oceans", "Eliminating terrorist content online", "Protection of coral reefs", "Safeguarding freedom of movement in the Indo-Pacific"],
            correct: "B. Eliminating terrorist content online",
            explanation: "The 'Christchurch Call' is a global initiative to prevent terrorist and extremist content from spreading online, named after the New Zealand tragedy."
        },
        {
            question: "Q33. Which of the following countries comprise the QUAD?",
            options: ["USA, Australia, Russia, China", "USA, Japan, China, India", "USA, India, Japan, Australia", "USA, Australia, France, India"],
            correct: "C. USA, India, Japan, Australia",
            explanation: "The Quadrilateral Security Dialogue (QUAD) includes the USA, India, Japan, and Australia, focusing on the Indo-Pacific region."
        },
        {
            question: "Q34. The Indo-Pacific Wing has been established within the ministry of:",
            options: ["Ministry of Defence", "Ministry of Home Affairs", "Ministry of External Affairs", "Ministry of Commerce & Industry"],
            correct: "C. Ministry of External Affairs",
            explanation: "The Ministry of External Affairs established the Indo-Pacific Wing to focus on India's strategic interests in the region."
        },
        {
            question: "Q35. Consider the following statements:\n1. The European Economic Community was established through the Rome Treaty.\n2. The European Union was established through the Maastricht Treaty.\nWhich of the statements given above is/are correct?",
            options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
            correct: "C. Both 1 and 2",
            explanation: "The Rome Treaty founded the European Economic Community in 1957, while the EU was formally created through the Maastricht Treaty in 1993."
        },
        {
            question: "Q36. Which of the following is the military exercise conducted between India and the 'Tatmadaw'?",
            options: ["IMBEX", "Surya Kiran", "Ekuverin", "Mitra Shakti"],
            correct: "A. IMBEX",
            explanation: "IMBEX is a military exercise between India and Myanmar (Tatmadaw), focusing on capacity building and counter-insurgency."
        },
        {
            question: "Q37. Consider the following statements:\n1. UN Special Rapporteurs are appointed by the UN Human Rights Council.\n2. India is a member of the UN Human Rights Council.\n3. The Office of the High Commissioner for Human Rights serves as the secretariat of the UN Human Rights Council.\nWhich of the statements given above is/are correct?",
            options: ["1 only", "1 and 2 only", "2 and 3 only", "1, 2, and 3"],
            correct: "D. 1, 2, and 3",
            explanation: "UN Special Rapporteurs are appointed by the UNHRC, of which India is a member, and the OHCHR acts as its secretariat."
        },
        {
            question: "Q38. Consider the following statements:\n1. The Right of Hot Pursuit is not allowed under international law.\n2. The United Nations Convention on the Law of the Sea replaced the Vienna Conventions of 1958.\nWhich of the statements given above is/are correct?",
            options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
            correct: "B. 2 only",
            explanation: "The Right of Hot Pursuit is allowed under international law in specific cases, and the UNCLOS replaced four conventions in 1958."
        },
        {
            question: "Q39. Which of the following countries currently has a military base on Diego Garcia?",
            options: ["United States", "China", "India", "Australia"],
            correct: "A. United States",
            explanation: "Diego Garcia, a strategic base in the Indian Ocean, is controlled by the United States under an agreement with the UK."
        },
        {
            question: "Q40. Which of the following is/are attributes of the Comprehensive Bilateral Dialogue?\n1. Mediation by the UN in non-territorial India-Pakistan disputes.\n2. Exclusion of Kashmir from the dialogue's purview.\n3. Religious tourism.\nSelect the correct answer:",
            options: ["1 only", "1 and 2 only", "3 only", "2 and 3 only"],
            correct: "C. 3 only",
            explanation: "Religious tourism is a component of the Comprehensive Bilateral Dialogue, while UN mediation and Kashmir exclusion are not attributes."
        },
        {
            question: "Q41. Consider the following statements related to the Arctic Council:\n1. It was formed through the Ottawa Declaration in 1996.\n2. Only Arctic nations are eligible for full membership.\n3. India has observer status in the Arctic Council.\nWhich of the statements given above is/are correct?",
            options: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2, and 3"],
            correct: "D. 1, 2, and 3",
            explanation: "The Arctic Council focuses on Arctic issues, with full membership for Arctic nations and observer status for others like India."
        },
        {
            question: "Q42. Regarding the agreement between Sri Lanka, Japan, and India to develop the East Container Terminal at Colombo port, consider the following statements:\n1. It will be jointly owned by India, Japan, and Sri Lanka.\n2. It lies adjacent to the China-backed 'Port City.'\nWhich of the statements given above is/are correct?",
            options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
            correct: "B. 2 only",
            explanation: "While the terminal lies near China's Port City, the ownership arrangement primarily involves Sri Lanka, with India and Japan as contributors."
        },
        {
            question: "Q43. Which of the following countries are not members of BIMSTEC?\n1. Nepal\n2. Pakistan\n3. Thailand\n4. Sri Lanka\n5. China\nSelect the correct answer:",
            options: ["1, 2, and 4 only", "2, 3, and 5 only", "2 and 5 only", "1 and 5 only"],
            correct: "C. 2 and 5 only",
            explanation: "Pakistan and China are not members of BIMSTEC, which includes nations like Nepal, Thailand, and Sri Lanka."
        },
        {
            question: "Q44. Consider the following statements about the Shanghai Cooperation Organisation (SCO):\n1. The SCO Charter was signed in 2002 during the St. Petersburg SCO head-of-state meeting.\n2. Both India and Pakistan hold observer status at the SCO.\nWhich of the statements given above is/are correct?",
            options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
            correct: "A. 1 only",
            explanation: "India and Pakistan are full members of the SCO, not observers. The SCO Charter was indeed signed in 2002."
        },
        {
            question: "Q45. Consider the following statements:\n1. The African Union superseded the Organisation of African Unity.\n2. India and the African Union have signed an agreement to build nuclear reactors.\nWhich of the statements given above is/are correct?",
            options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
            correct: "A. 1 only",
            explanation: "The African Union replaced the Organisation of African Unity, but India has not signed any agreement to build nuclear reactors with it."
        },
        {
            question: "Q46. Consider the following statements about the Maldives:\n1. It is a tropical nation in the Indian Ocean region.\n2. It is a member of SAARC.\n3. It has signed six agreements with the Government of India recently.\nWhich of the statements given above is/are correct?",
            options: ["1 and 3 only", "1 only", "3 only", "1, 2, and 3"],
            correct: "D. 1, 2, and 3",
            explanation: "The Maldives, a SAARC member, recently enhanced its cooperation with India by signing multiple agreements across sectors."
        },
        {
            question: "Q47. Which of the following countries are members of SAARC?\n1. Maldives\n2. Afghanistan\n3. Nepal\n4. Pakistan\nSelect the correct answer:",
            options: ["1, 2, and 3 only", "1, 3, and 4 only", "2, 3, and 4 only", "1, 2, 3, and 4"],
            correct: "D. 1, 2, 3, and 4",
            explanation: "SAARC includes Afghanistan, Nepal, Maldives, Pakistan, and four other South Asian nations."
        },
        {
            question: "Q48. Consider the following statements:\n1. South Africa is India's largest trading partner in Africa.\n2. Nigeria is the largest economy in the African Union.\n3. Boko Haram is a terrorist organization currently affecting West Africa.\nWhich of the statements given above are correct?",
            options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2, and 3"],
            correct: "D. 1, 2, and 3",
            explanation: "South Africa leads as India's trading partner, Nigeria holds the largest economy status, and Boko Haram operates in West Africa."
        },
        {
            question: "Q49. Which of the following correctly describes the 'Washington Consensus'?\n1. It was an agreement between the IMF, World Bank, and the U.S. on economic policies for developing countries.\n2. Its recommendations were neoliberal in nature, supporting free markets and reduced state involvement.\nSelect the correct answer:",
            options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
            correct: "C. Both 1 and 2",
            explanation: "The Washington Consensus outlined free-market economic policies for developing countries to achieve growth."
        },
        {
            question: "Q50. Which of the following is/are correctly matched?\nInternational Grouping/Organization – Region of Focus:\n1. BIMSTEC – Hindu-Kush range\n2. Quadrilateral – Indo-Pacific\nSelect the correct answer:",
            options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
            correct: "B. 2 only",
            explanation: "The Quadrilateral focuses on the Indo-Pacific, but BIMSTEC is centered around the Bay of Bengal, not the Hindu-Kush range."
        }
    ];
    


let currentQuestion = 0;

function loadQuestion() {
    const questionBox = document.getElementById("question-box");
    const answerBox = document.getElementById("answer-box");
    const questionEl = document.getElementById("question");
    const options = document.querySelectorAll(".option-text");
    const lineTimer = document.querySelector(".line-timer");

    questionBox.classList.remove("hidden");
    answerBox.classList.add("hidden");

    questionEl.textContent = questions[currentQuestion].question;
    options.forEach((option, index) => {
        option.textContent = questions[currentQuestion].options[index];
    });

    lineTimer.style.animation = "none";
    setTimeout(() => {
        lineTimer.style.animation = "";
    }, 0);

    setTimeout(showAnswer, 10000); // Show answer after 10 seconds
}

function showAnswer() {
    const questionBox = document.getElementById("question-box");
    const answerBox = document.getElementById("answer-box");
    const answerText = document.getElementById("answer-text");
    const explanation = document.getElementById("explanation");

    questionBox.classList.add("hidden");
    answerBox.classList.remove("hidden");

    const correctAnswer = questions[currentQuestion].correct;
    const explanationText = questions[currentQuestion].explanation;

    answerText.textContent = `Correct Answer: ${correctAnswer}`;
    explanation.textContent = explanationText;

    setTimeout(nextQuestion, 10000); // Load next question after 10 seconds
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        showEndScreen();
        return;
    }
    loadQuestion();
}

function checkAnswer(selected) {
    const correctAnswer = questions[currentQuestion].correct;
    if (selected === correctAnswer) {
        alert("Correct!");
    } else {
        alert("Wrong Answer!");
    }
}

function startQuiz() {
    const startScreen = document.getElementById("start-screen");
    const quizContent = document.getElementById("quiz-content");
    const bgm = document.getElementById("bgm");
    startScreen.style.display = "none";
    startScreen.classList.add("hidden");
    quizContent.classList.remove("hidden");

    bgm.play(); // Play background music
    loadQuestion(); // Start the quiz
}

function showEndScreen() {
    const quizContent = document.getElementById("quiz-content");
    const endScreen = document.getElementById("end-screen");

    quizContent.classList.add("hidden");
    endScreen.classList.remove("hidden");
}

// Handle keyboard events for starting the quiz with Spacebar
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") { // Check if Spacebar is pressed
        event.preventDefault(); // Prevent default page scroll behavior
        startQuiz();
    }
});


function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen().catch((err) => {
            console.error(`Error attempting to exit fullscreen mode: ${err.message}`);
        });
    }
}
