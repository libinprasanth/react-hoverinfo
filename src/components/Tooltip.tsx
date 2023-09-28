import * as React from 'react'
import './Tooltip.css'

type TooltipProps = {
  id: string
  className?: string
}
function Tooltip({ id, className = '' }: TooltipProps) {
  const observerRef = React.useRef<MutationObserver | null>(null)
  const addedTooltipElements = new WeakMap<HTMLElement, boolean>()
  const [content, setContent] = React.useState('')
  const [style, setStyle] = React.useState({})
  React.useEffect(() => {
    const handleMutation = (mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          const elementsWithAttribute = document.querySelectorAll('[data-tooltip-content]')

          // Handle changes on elements with the attribute
          elementsWithAttribute.forEach((element) => {
            addTooltipBehavior(element as any)
            // Add your custom logic here to update tooltip behavior, etc.
          })
        }
      }
    }

    observerRef.current = new MutationObserver(handleMutation)

    observerRef.current?.observe(document.body, {
      childList: true,
      subtree: true,
    })
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const addTooltipBehavior = (element: HTMLElement) => {
    if (!addedTooltipElements.get(element)) {
      element.addEventListener('mouseenter', showTooltip)
      element.addEventListener('mouseleave', hideTooltip)
      element.addEventListener('click', hideTooltip)
      addedTooltipElements.set(element, true)
    }
  }

  const showTooltip = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const tooltipContent = target.getAttribute('data-tooltip-content')

    if (tooltipContent) {
      const rect: any = document.querySelector('body')?.getClientRects()[0]
      setContent(tooltipContent)
      const w = rect?.width || 0
      const top = event.clientY + 20
      setStyle(() => ({
        ...(event.clientX < w - 150 ? { left: event.clientX } : { right: w - event.clientX }),
        top,
      }))
      //   const tooltip = document.createElement("div");
      //   tooltip.className = "tooltip";
      //   tooltip.textContent = tooltipContent;
      //   document.body.appendChild(tooltip);

      //   const rect = target.getBoundingClientRect();
      //   tooltip.style.left = rect.left + "px";
      //   tooltip.style.top = rect.bottom + "px";
    }
  }

  const hideTooltip = () => {
    setContent('')
    setStyle(() => ({}))
  }

  React.useEffect(() => {
    document.addEventListener('click', hideTooltip)
    return () => {
      document.removeEventListener('click', hideTooltip)
    }
  }, [])

  return (
    <div
      className={`react-tooltip ${className} ${content ? 'active' : ''}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  ) // Tooltip component doesn't render anything
}

export { Tooltip, TooltipProps }
