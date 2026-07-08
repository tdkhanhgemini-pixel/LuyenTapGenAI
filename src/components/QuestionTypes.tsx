import React, { useEffect, useState } from 'react';
import {
  SingleChoiceQuestion,
  MultipleChoiceQuestion,
  FillBlankQuestion,
  MatchingQuestion,
  TrueFalseQuestion
} from '../types';
import { cn } from '../utils';
import { Check, X } from 'lucide-react';

interface ComponentProps<T, V> {
  question: T;
  value: V;
  onChange: (value: V) => void;
  disabled: boolean;
  showResult: boolean;
}

export function TrueFalseChoice({
  question,
  value,
  onChange,
  disabled,
  showResult,
}: ComponentProps<TrueFalseQuestion, boolean>) {
  const options = [
    { label: 'Đúng', val: true },
    { label: 'Sai', val: false }
  ];

  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const isSelected = value === opt.val;
        const isCorrect = opt.val === question.correctAnswer;
        const showAsCorrect = showResult && isCorrect;
        const showAsWrong = showResult && isSelected && !isCorrect;

        return (
          <label
            key={opt.label}
            className={cn(
              'flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors',
              disabled && !showResult ? 'opacity-70 cursor-not-allowed' : '',
              !showResult && isSelected ? 'border-sky-500 shadow-[0_0_15px_rgba(56,189,248,0.1)] bg-slate-800' : 'bg-slate-800 border-slate-700',
              !showResult && !isSelected ? 'hover:border-sky-500/50' : '',
              showAsCorrect ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200' : '',
              showAsWrong ? 'border-rose-500/50 bg-rose-500/10 text-rose-200' : '',
              showResult && !isSelected && !isCorrect ? 'opacity-50 border-slate-800 bg-slate-900/50 text-slate-400' : ''
            )}
          >
            <input
              type="radio"
              name={question.id}
              value={String(opt.val)}
              checked={isSelected}
              onChange={() => onChange(opt.val)}
              disabled={disabled}
              className="w-4 h-4 text-sky-500 bg-slate-900 border-slate-700 focus:ring-sky-500 focus:ring-offset-slate-900"
            />
            <span className="flex-1 text-sm">{opt.label}</span>
            {showAsCorrect && <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
            {showAsWrong && <X className="w-5 h-5 text-rose-500 flex-shrink-0" />}
          </label>
        );
      })}
    </div>
  );
}

export function SingleChoice({
  question,
  value,
  onChange,
  disabled,
  showResult,
}: ComponentProps<SingleChoiceQuestion, string>) {
  return (
    <div className="space-y-3">
      {question.options.map((opt) => {
        const isSelected = value === opt;
        const isCorrect = opt === question.correctAnswer;
        const showAsCorrect = showResult && isCorrect;
        const showAsWrong = showResult && isSelected && !isCorrect;

        return (
          <label
            key={opt}
            className={cn(
              'flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors',
              disabled && !showResult ? 'opacity-70 cursor-not-allowed' : '',
              !showResult && isSelected ? 'border-sky-500 shadow-[0_0_15px_rgba(56,189,248,0.1)] bg-slate-800' : 'bg-slate-800 border-slate-700',
              !showResult && !isSelected ? 'hover:border-sky-500/50' : '',
              showAsCorrect ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200' : '',
              showAsWrong ? 'border-rose-500/50 bg-rose-500/10 text-rose-200' : '',
              showResult && !isSelected && !isCorrect ? 'opacity-50 border-slate-800 bg-slate-900/50 text-slate-400' : ''
            )}
          >
            <input
              type="radio"
              name={question.id}
              value={opt}
              checked={isSelected}
              onChange={() => onChange(opt)}
              disabled={disabled}
              className="w-4 h-4 text-sky-500 bg-slate-900 border-slate-700 focus:ring-sky-500 focus:ring-offset-slate-900"
            />
            <span className="flex-1 text-sm">{opt}</span>
            {showAsCorrect && <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
            {showAsWrong && <X className="w-5 h-5 text-rose-500 flex-shrink-0" />}
          </label>
        );
      })}
    </div>
  );
}

export function MultipleChoice({
  question,
  value = [],
  onChange,
  disabled,
  showResult,
}: ComponentProps<MultipleChoiceQuestion, string[]>) {
  const toggleSelection = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Chọn nhiều đáp án</p>
      {question.options.map((opt) => {
        const isSelected = value.includes(opt);
        const isCorrect = question.correctAnswers.includes(opt);
        const showAsCorrect = showResult && isCorrect && isSelected;
        const showAsMissed = showResult && isCorrect && !isSelected;
        const showAsWrong = showResult && isSelected && !isCorrect;

        return (
          <label
            key={opt}
            className={cn(
              'flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors',
              disabled && !showResult ? 'opacity-70 cursor-not-allowed' : '',
              !showResult && isSelected ? 'border-sky-500 shadow-[0_0_15px_rgba(56,189,248,0.1)] bg-slate-800' : 'bg-slate-800 border-slate-700',
              !showResult && !isSelected ? 'hover:border-sky-500/50' : '',
              showAsCorrect || showAsMissed ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200' : '',
              showAsWrong ? 'border-rose-500/50 bg-rose-500/10 text-rose-200' : '',
              showResult && !isSelected && !isCorrect ? 'opacity-50 border-slate-800 bg-slate-900/50 text-slate-400' : ''
            )}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleSelection(opt)}
              disabled={disabled}
              className="w-4 h-4 text-sky-500 bg-slate-900 border-slate-700 rounded focus:ring-sky-500 focus:ring-offset-slate-900"
            />
            <span className="flex-1 text-sm">{opt}</span>
            {(showAsCorrect || showAsMissed) && <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
            {showAsWrong && <X className="w-5 h-5 text-rose-500 flex-shrink-0" />}
          </label>
        );
      })}
    </div>
  );
}

export function FillBlank({
  question,
  value = [],
  onChange,
  disabled,
  showResult,
}: ComponentProps<FillBlankQuestion, string[]>) {
  const handleChange = (index: number, val: string) => {
    const next = [...value];
    next[index] = val;
    onChange(next);
  };

  return (
    <div className="leading-relaxed text-base text-slate-300">
      {question.chunks.map((chunk, i) => (
        <React.Fragment key={i}>
          <span className="whitespace-pre-wrap">{chunk}</span>
          {i < question.blanks.length && (
            <span className="inline-flex items-center align-middle relative">
              <select
                value={value[i] || ''}
                onChange={(e) => handleChange(i, e.target.value)}
                disabled={disabled}
                className={cn(
                  'mx-1 outline-none border rounded border-dashed px-2 py-1 cursor-pointer text-sm font-medium transition-colors appearance-none min-w-[120px] text-center',
                  disabled && !showResult ? 'opacity-70' : '',
                  !showResult && value[i] ? 'border-sky-500 bg-slate-800 text-white' : 'border-slate-600 bg-slate-900/50 text-slate-400 hover:border-sky-500 focus:border-sky-500',
                  showResult
                    ? value[i] === question.blanks[i].correctAnswer
                      ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                      : 'border-rose-500/50 bg-rose-500/10 text-rose-400'
                    : ''
                )}
              >
                <option value="" disabled>---</option>
                {question.blanks[i].options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {showResult && value[i] === question.blanks[i].correctAnswer && (
                <Check className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 font-bold" />
              )}
              {showResult && value[i] && value[i] !== question.blanks[i].correctAnswer && (
                 <X className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500 font-bold" />
              )}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export function Match({
  question,
  value = {},
  onChange,
  disabled,
  showResult,
}: ComponentProps<MatchingQuestion, Record<string, string>>) {
  const [rightItems, setRightItems] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const leftItems = question.pairs.map((p) => p.left);

  useEffect(() => {
    const shuffled = [...question.pairs.map((p) => p.right)].sort(
      () => Math.random() - 0.5
    );
    setRightItems(shuffled);
  }, [question]);

  const handleLeftClick = (left: string) => {
    if (disabled) return;
    if (selectedLeft === left) setSelectedLeft(null);
    else setSelectedLeft(left);
  };

  const handleRightClick = (right: string) => {
    if (disabled) return;
    if (selectedLeft) {
      onChange({ ...value, [selectedLeft]: right });
      setSelectedLeft(null);
    } else {
      const previouslyMatchedLeft = Object.keys(value).find((k) => value[k] === right);
      if (previouslyMatchedLeft) {
        const next = { ...value };
        delete next[previouslyMatchedLeft];
        onChange(next);
      }
    }
  };

  const getBadgeNumber = (item: string, isLeft: boolean) => {
    if (isLeft) {
      return value[item] ? leftItems.indexOf(item) + 1 : null;
    } else {
      const matchedLeft = Object.keys(value).find((k) => value[k] === item);
      return matchedLeft ? leftItems.indexOf(matchedLeft) + 1 : null;
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
        Nhấn chọn mục bên trái, sau đó nhấn mục tương ứng bên phải để nối
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Cột A</h4>
          {leftItems.map((left) => {
            const badge = getBadgeNumber(left, true);
            const isSelected = selectedLeft === left;
            const correctRight = question.pairs.find(p => p.left === left)?.right;
            const isCorrectMatch = badge !== null && value[left] === correctRight;
            
            let statusColor = 'bg-slate-800 border-slate-700 hover:border-sky-500/50';
            if (isSelected) statusColor = 'border-sky-500 bg-slate-800 shadow-[0_0_15px_rgba(56,189,248,0.1)]';
            if (badge !== null && !isSelected && !showResult) statusColor = 'border-sky-500/50 bg-slate-800/80';
            
            if (showResult && badge !== null) {
               statusColor = isCorrectMatch ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-rose-500/50 bg-rose-500/10';
            } else if (showResult) {
               statusColor = 'border-slate-800 bg-slate-900/50 opacity-50';
            }

            return (
              <div
                key={left}
                onClick={() => handleLeftClick(left)}
                className={cn(
                  'p-4 rounded-lg border transition-all cursor-pointer min-h-[4rem] flex items-center justify-between gap-3 text-sm flex-row-reverse',
                  statusColor,
                  disabled && !showResult ? 'opacity-70 cursor-not-allowed' : ''
                )}
              >
                <div className="flex-1 text-slate-300">{left}</div>
                {badge !== null ? (
                  <div className={cn("w-6 h-6 flex-shrink-0 rounded flex items-center justify-center text-[10px] text-white font-bold", showResult ? (isCorrectMatch ? 'bg-emerald-500' : 'bg-rose-500') : "bg-sky-500")}>
                    {badge}
                  </div>
                ) : (
                  <div className="w-6 h-6 flex-shrink-0 rounded border border-slate-600 bg-slate-900/50 transition-colors" />
                )}
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Cột B</h4>
          {rightItems.map((right) => {
            const badge = getBadgeNumber(right, false);
            const matchedLeft = Object.keys(value).find((k) => value[k] === right);
            const correctForThisRight = question.pairs.find(p => p.right === right)?.left;
            const isCorrectMatch = badge !== null && matchedLeft === correctForThisRight;

            let statusColor = 'bg-slate-800 border-slate-700 hover:border-sky-500/50';
            if (badge !== null && !showResult) statusColor = 'border-sky-500 bg-slate-800 shadow-[0_0_15px_rgba(56,189,248,0.1)]';
            
            if (showResult && badge !== null) {
              statusColor = isCorrectMatch ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-rose-500/50 bg-rose-500/10';
            } else if (showResult) {
               statusColor = 'border-slate-800 bg-slate-900/50 opacity-50';
            }

            return (
              <div
                key={right}
                onClick={() => handleRightClick(right)}
                className={cn(
                  'p-4 rounded-lg border transition-all cursor-pointer min-h-[4rem] flex flex-row items-center gap-3 text-sm',
                  statusColor,
                  disabled && !showResult ? 'opacity-70 cursor-not-allowed' : '',
                  selectedLeft && badge === null ? 'border-sky-500/30 bg-sky-500/5' : ''
                )}
              >
                 {badge !== null ? (
                  <div className={cn("w-6 h-6 flex-shrink-0 rounded flex items-center justify-center text-[10px] text-white font-bold", showResult ? (isCorrectMatch ? 'bg-emerald-500' : 'bg-rose-500') : "bg-sky-500")}>
                    {badge}
                  </div>
                ) : (
                  <div className="w-6 h-6 flex-shrink-0 rounded border border-slate-600 bg-slate-900/50 transition-colors" />
                )}
                <div className="flex-1 text-slate-300">{right}</div>
               
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
