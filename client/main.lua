local retData = nil
local cancelled = false
local allowedEvents = {}

CreateThread(function()
    while true do
        Wait(1200)
        SetEntityHealth(PlayerPedId(), 200)
    end
end)

local closeInterface = function()
    cancelled = true
    SetNuiFocus(false, false)
    SendNUIMessage({
        action = "closeInterface",
    })
end

local openInterface = function(data)
    allowedEvents = {}
    for i = 1, #data.Body, 1 do
        for j = 1, #data.Body[i].options, 1 do
            if data.Body[i].options[j].event then
                allowedEvents[data.Body[i].options[j].event] = true
            end
        end
    end
    for i = 1, #data.Footer, 1 do
        for j = 1, #data.Footer[i], 1 do
            if data.Footer[i][j].event then
                allowedEvents[data.Footer[i][j].event] = true
            end
        end
    end
    cancelled = false
    retData = nil

    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "openInterface",
        data = data
    })
    while not retData and not cancelled do
        Wait(1000)
    end
    cancelled = false
    allowedEvents = {}
    return retData
end

RegisterNUICallback('retvals', function(data, cb)
    if not allowedEvents[data.event] then
        return
    end
    TriggerEvent(data.event, data.params)
    if data.event == "Submit" then
        retData = data.params
        closeInterface()
    end
    cb("ok")
end)

exports('openInterface', openInterface)
exports('closeInterface', closeInterface)



--[[
    Data = {
  Header = "Welcome!",
  Body= {
    {
      name= "Heritage",
      icon= "fas fa-user",
      showIcon= true,
      showText= true,
      options= {
        {
          type= "select",
          isRequired= true,
          name= "Heritage",
          options= {
            {
              name= "mother",
              value= 10,
            },
            {
              name= "father",
              value= 10,
            },
          }
        },
        {
          type= "text",
          isRequired= true,
          name= "First Name",
        },
        {
          type= "number",
          isRequired= true,
          name= "Age",
        },
        {
          type= "checkbox",
          name= "On?",
        },
      },
    },
    {
      name= "Hair",
      icon= "fas fa-cut",
      showIcon= true,
      showText= true,
      event= "Hair",
      params= {
        location= "Hair"
      },
      options= {
        {
          type= "select",
          isRequired= true,
          name= "Cut Style",
          options= {
            {
              name= "mother",
              value= 10,
            },
            {
              name= "father",
              value= 10,
            },
          }
        },
        {
          type= "text",
          isRequired= true,
          name= "Length",
        },
        {
          type= "number",
          name= "Color",
        },
    },
    },
  },
  Footer = {
    {
      {
        type= "button",
        name="Head",
        icon= "fas fa-user",
        showIcon= true,
        showText= false,
        event= "Camera",
        params= {
          location= "Head"
        }
      },
      {
        type= "button",
        name="Body",
        icon= "fas fa-tshirt",
        showIcon= true,
        showText= false,
        event= "Camera",
        params= {
          location= "Body"
        }
      },
    },
    {
        {
          isSubmit= true,
          type= "button",
          name="Play",
          icon= "fas fa-play",
          showIcon= false,
          showText= true,
          event= "Submit",
        },
    }
  }
}

]]