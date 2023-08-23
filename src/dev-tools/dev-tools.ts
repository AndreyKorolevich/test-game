class DevTools {
  private readonly _container: HTMLDivElement

  private readonly _selectContainer: HTMLDivElement
  private readonly _topCenterSelect: HTMLSelectElement
  private readonly _centerSelect: HTMLSelectElement
  private readonly _bottomSelect: HTMLSelectElement
  private readonly _reelSelect: HTMLSelectElement
  private readonly _rowSelect: HTMLSelectElement
  private readonly _options: Array<string> = ['plum', 'grapes', 'bell', 'apple', 'coin', 'shoe', 'diamond', 'peach', 'random']
  private readonly _reelOptions: Array<string> = ['three', 'four', 'five', 'six', 'seven']
  private readonly _rowOptions: Array<string> = ['three', 'four']
  private _selectedOptions: Record<string, number> = {}

  constructor(appContainer: HTMLElement, callback: (options: Record<string, number>) => void) {
    this._container = document.createElement('div')
    this._container.style.position = 'absolute'
    this._container.style.left = '50%'
    this._container.style.top = '10%'
    this._container.style.transform = 'translate(-50%, -50%)'
    this._container.style.maxWidth = '100%'
    appContainer.appendChild(this._container)

    this._selectContainer = document.createElement('div')
    this._selectContainer.style.display = 'flex'
    this._selectContainer.style.flexDirection = 'row'
    this._selectContainer.style.alignItems = 'center'
    this._selectContainer.style.gap = '20px'
    this._selectContainer.style.padding = '10px'
    this._selectContainer.style.backgroundColor = '#cddc39'
    this._selectContainer.style.overflowX = 'auto'


    this._topCenterSelect = this._createSelect(this._options)
    this._centerSelect = this._createSelect(this._options)
    this._bottomSelect = this._createSelect(this._options)
    this._reelSelect = this._createSelect(this._reelOptions)
    this._rowSelect = this._createSelect(this._rowOptions)

    this._addSelectableGroup('Top', this._topCenterSelect)
    this._addSelectableGroup('Center', this._centerSelect)
    this._addSelectableGroup('Bottom', this._bottomSelect)
    this._addSelectableGroup('Reel', this._reelSelect)
    this._addSelectableGroup('Row', this._rowSelect)

    this._selectContainer.appendChild(this._createSendButton(callback))

    this._container.appendChild(this._selectContainer)

    // Attach event listeners to the select elements
    this._topCenterSelect.addEventListener('change', this._handleSelectChange.bind(this, 'top'))
    this._centerSelect.addEventListener('change', this._handleSelectChange.bind(this, 'center'))
    this._bottomSelect.addEventListener('change', this._handleSelectChange.bind(this, 'bottom'))
    this._reelSelect.addEventListener('change', this._handleSelectChange.bind(this, 'reel'))
    this._rowSelect.addEventListener('change', this._handleSelectChange.bind(this, 'row'))
  }

  private _addSelectableGroup(label: string, select: HTMLSelectElement): void {
    const groupContainer = document.createElement('div')
    groupContainer.style.display = 'flex'
    groupContainer.style.flexDirection = 'column'
    groupContainer.style.alignItems = 'center'

    const groupLabel = document.createElement('label')
    groupLabel.textContent = label

    groupContainer.appendChild(groupLabel)
    groupContainer.appendChild(select)

    this._selectContainer.appendChild(groupContainer)
  }

  private _createSelect(options: string[]): HTMLSelectElement {
    const select = document.createElement('select')
    select.style.padding = '5px'
    options.forEach((optionText, index) => {
      const option = document.createElement('option')
      option.text = optionText
      option.value = index.toString()
      select.add(option)
    })

    select.selectedIndex = options.length - 1
    return select
  }

  private _handleSelectChange(groupName: string, event: Event): void {
    const select = event.target as HTMLSelectElement
    let selectedOption = Number(select.value)
    if(groupName === 'reel' || groupName === 'row'){
      selectedOption += 3
    }
    this._selectedOptions[groupName] = selectedOption
  }

  private _createSendButton(callback: (options: Record<string, number>) => void): HTMLButtonElement {
    const sendButton = document.createElement('button')
    sendButton.textContent = 'Save settings'
    sendButton.style.padding = '10px'
    sendButton.style.backgroundColor = '#3498db'
    sendButton.style.color = 'white'
    sendButton.style.border = 'none'
    sendButton.style.cursor = 'pointer'

    sendButton.addEventListener('click', () => {
      callback(this._selectedOptions)
    })

    return sendButton
  }
}

export default DevTools
