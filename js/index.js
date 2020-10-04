import { examType } from "./examType.js";

window.onload = () => {
  const examTypeSelect = document.getElementById("examType");
  let optionStr = "";
  Object.keys(examType).forEach((key) => {
    optionStr += `<option value="${key}">${examType[key].label}</option>\n`;
  });

  examTypeSelect.innerHTML = optionStr;
};

document.getElementById("generateExamArea").addEventListener("click", () => {
  const examArea = document.getElementById("examArea");
  if (examArea.innerHTML != "") {
    const deleteBool = confirm("現在のデータは削除されます。\n宜しいですか？");
    if (deleteBool) {
      examArea.innerHTML = "";
    } else {
      alert("生成を中断しました。");
      return;
    }
  }

  const selectedExamType = document.getElementById("examType").value;
  const selectedAnswerNumStr = document.getElementById("answerNum").value;
  const selectedExamNumStr = document.getElementById("examNum").value;

  const selectedAnswerNum = numValidator(selectedAnswerNumStr, "選択肢数", 10);
  const selectedExamNum = numValidator(selectedExamNumStr, "問題数", 100);

  const choises = examType[selectedExamType].choices;
  let optionsList = "";

  for (let index = 0; index < selectedAnswerNum; index++) {
    optionsList += `<option value="${choises[index]}">${
      choises[index]
    }</option>\n`;
  }

  for (let index = 1; index <= selectedExamNum; index++) {
    const answerList =
      `<div><select id="exam${index}" class="inputArea">\n${optionsList}</select></div>`;
    const examHTML =
      `<div class="dis_flex"><span>${index}</span>\n${answerList}\n${answerList}\n</div>`;
    examArea.innerHTML += examHTML;
  }

  alert("生成完了！");
});

function numValidator(num, errorTag, maxRange) {
  num = parseInt(num, 10);

  if (isNaN(num)) {
    alert(`${errorTag}は半角数字を入力してください`);
    throw new Error();
  }
  if (num < maxRange && 0 > num) {
    alert(`${errorTag}は1〜${maxRange}まで`);
    throw new Error();
  }

  return num;
}
