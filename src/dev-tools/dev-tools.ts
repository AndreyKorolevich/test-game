class DevTools {
  private readonly _container: HTMLDivElement

  private readonly _selectContainer: HTMLDivElement
  private readonly _topCenterSelect: HTMLSelectElement
  private readonly _centerSelect: HTMLSelectElement
  private readonly _bottomSelect: HTMLSelectElement
  private readonly _options: Array<string> = ['cell1', 'cell2', 'cell3', 'cell4', 'cell5', 'cell6', 'cell7', 'cell8', 'random']

  private _selectedOptions: Record<string, number> = {}

  constructor(appContainer: HTMLElement, callback: (options: Record<string, number>) => void) {
    this._container = document.createElement('div')
    this._container.style.position = 'absolute'
    this._container.style.left = '50%'
    this._container.style.top = '10%'
    this._container.style.transform = 'translate(-50%, -50%)'
    appContainer.appendChild(this._container)

    this._selectContainer = document.createElement('div')
    this._selectContainer.style.display = 'flex'
    this._selectContainer.style.flexDirection = 'row'
    this._selectContainer.style.alignItems = 'center'
    this._selectContainer.style.gap = '20px'
    this._selectContainer.style.padding = '20px'
    this._selectContainer.style.backgroundColor = '#cddc39'

    this._topCenterSelect = this._createSelect(this._options)
    this._centerSelect = this._createSelect(this._options)
    this._bottomSelect = this._createSelect(this._options)

    this._addSelectableGroup('Top', this._topCenterSelect)
    this._addSelectableGroup('Center', this._centerSelect)
    this._addSelectableGroup('Bottom', this._bottomSelect)

    this._selectContainer.appendChild(this._createSendButton(callback))

    this._container.appendChild(this._selectContainer)

    // Attach event listeners to the select elements
    this._topCenterSelect.addEventListener('change', this._handleSelectChange.bind(this, 'top'))
    this._centerSelect.addEventListener('change', this._handleSelectChange.bind(this, 'center'))
    this._bottomSelect.addEventListener('change', this._handleSelectChange.bind(this, 'bottom'))
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
    const selectedOption = Number(select.value)
    this._selectedOptions[groupName] = selectedOption
    console.log(`Selected option for ${groupName}: ${selectedOption}`)
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
