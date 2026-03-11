'use client';

import 'react-day-picker/dist/style.css';

import { DayPicker } from 'react-day-picker';
import { useEffect, useMemo, useRef, useState } from 'react';

type DatePickerInputProps = {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
};

const formatDisplay = (value: string) => {
  if (!value) {
    return '';
  }
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
};

const parseDate = (value: string) => {
  if (!value) {
    return undefined;
  }
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

const toIsoDate = (value?: Date) => {
  if (!value) {
    return '';
  }
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function DatePickerInput({
  value,
  onChange,
  placeholder = 'Select date'
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selected = useMemo(() => parseDate(value), [value]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [open]);

  return (
    <div className="date-picker" ref={wrapperRef}>
      <button
        type="button"
        className="date-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        {value ? formatDisplay(value) : placeholder}
      </button>
      {open ? (
        <div className="date-popover">
          <div className="date-controls">
            <button
              type="button"
              className="date-action"
              onClick={() => {
                const today = new Date();
                onChange(toIsoDate(today));
                setOpen(false);
              }}
            >
              Today
            </button>
            <button
              type="button"
              className="date-action ghost"
              onClick={() => {
                onChange('');
                setOpen(false);
              }}
            >
              Clear
            </button>
          </div>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(next) => {
              onChange(toIsoDate(next ?? undefined));
              setOpen(false);
            }}
            weekStartsOn={1}
          />
        </div>
      ) : null}
    </div>
  );
}
