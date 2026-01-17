<script lang="ts">
  type Props = {
    width?: string | number;
    height?: string | number;
  };

  const { width = 100, height = 80 }: Props = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" {width} {height}>
  <path
    d="M10 52
       C8 48, 14 46, 18 48
       C20 44, 28 44, 32 46
       C36 44, 44 44, 46 48
       C50 46, 56 48, 54 52
       Z"
    fill="#ffd9b3"
    stroke="#000"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
  />

  <path
    d="M28 26
       C26 34, 26 42, 28 50
       L36 50
       C38 42, 38 34, 36 26
       Z"
    fill="#ff9f40"
    stroke="#000"
    stroke-width="3"
    stroke-linejoin="round"
  />

  <ellipse cx="32" cy="36" rx="14" ry="4" fill="none" stroke="#000" stroke-width="3" />
  <ellipse cx="32" cy="42" rx="12" ry="3" fill="none" stroke="#000" stroke-width="3" />

  <path
    d="M14 22
       C10 18, 14 12, 20 12
       C22 8, 28 6, 32 8
       C36 6, 42 8, 44 12
       C50 12, 54 18, 50 22
       C54 26, 50 30, 44 30
       C42 34, 36 34, 32 32
       C28 34, 22 34, 20 30
       C14 30, 10 26, 14 22
       Z"
    fill="#ffffff"
    stroke="#000"
    stroke-width="3"
    stroke-linejoin="round"
  />

  <ellipse cx="32" cy="18" rx="18" ry="7" fill="#ffb366" stroke="#000" stroke-width="3" />
</svg>
