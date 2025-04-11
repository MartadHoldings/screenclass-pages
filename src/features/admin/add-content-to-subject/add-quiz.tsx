import React from "react";

export default function AddQuiz() {
  return (
    <>
      <section className="mt-10 space-y-6 bg-white px-4 py-3">
        <div className="border-b py-3">
          <h2 className="text-xl font-medium">Add Quiz to Sub topic</h2>
        </div>

        <div className="w-full">
          <p className="text-lg font-medium italic">How it works!!!</p>

          <ol className="list-inside list-decimal text-slate-500">
            <li>Enter the question in the input field.</li>
            <li>Fill in all four answer options.</li>
            <li>
              Select the correct answer by clicking the radio button next to it.
            </li>
            <li>Review the question and options to ensure accuracy.</li>
            <li>
              Click the &quot;Save Question&quot; button to store the question.
            </li>
            <li>Once saved, the form resets for adding a new question.</li>
          </ol>

          {/* <QuizContainer /> */}
        </div>
      </section>
    </>
  );
}
